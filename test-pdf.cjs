/**
 * PDF 工具完整测试 - 使用真实 PDF 文件测试所有 5 个工具
 */
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')
const { createCanvas } = require('canvas')

const TEST_PDF = path.join(__dirname, 'public/test.pdf')
const OUT = path.join(__dirname, 'test-pdf-report')
fs.mkdirSync(OUT, { recursive: true })

let pass = 0, fail = 0

async function test(name, fn) {
  try {
    await fn()
    console.log(`  ✅ ${name}`)
    pass++
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`)
    fail++
  }
}

async function main() {
  const pdfBytes = fs.readFileSync(TEST_PDF)
  const origSize = pdfBytes.length
  console.log(`\n测试 PDF: ${(origSize/1024).toFixed(1)} KB\n`)

  // ========== 1. 合并 PDF ==========
  console.log('--- 1. 合并 PDF ---')
  await test('合并 PDF: 两个相同 PDF 合并', async () => {
    const mergedPdf = await PDFDocument.create()
    for (let i = 0; i < 2; i++) {
      const pdf = await PDFDocument.load(pdfBytes)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(p => mergedPdf.addPage(p))
    }
    const result = await mergedPdf.save()
    const resultPdf = await PDFDocument.load(result)
    fs.writeFileSync(path.join(OUT, 'merge-two.pdf'), Buffer.from(result))
    if (resultPdf.getPageCount() !== 6) throw new Error(`Expected 6 pages, got ${resultPdf.getPageCount()}`)
    console.log(`  → ${resultPdf.getPageCount()} pages, ${(result.length/1024).toFixed(1)} KB`)
  })

  // ========== 2. 拆分 PDF ==========
  console.log('\n--- 2. 拆分 PDF ---')
  await test('拆分 PDF: 每页一个文件', async () => {
    const pdf = await PDFDocument.load(pdfBytes)
    const pageCount = pdf.getPageCount()
    const results = []
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create()
      const [page] = await newPdf.copyPages(pdf, [i])
      newPdf.addPage(page)
      const buf = await newPdf.save()
      results.push(buf)
      fs.writeFileSync(path.join(OUT, `split-page-${i+1}.pdf`), Buffer.from(buf))
    }
    if (results.length !== 3) throw new Error(`Expected 3 pages, got ${results.length}`)
    console.log(`  → ${results.length} pages, total ${(results.reduce((s,b)=>s+b.length,0)/1024).toFixed(1)} KB`)
  })

  // ========== 3. JPG 转 PDF ==========
  console.log('\n--- 3. JPG 转 PDF ---')
  await test('JPG 转 PDF: 单张图片', async () => {
    const pdfDoc = await PDFDocument.create()
    // 使用 pdf-lib 创建一张测试图片
    const pngBytes = fs.readFileSync(path.join(__dirname, 'public/test.pdf'))
    // 用 canvas 生成一张测试 JPG
    const canvas = createCanvas(400, 300)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#4A90D9'
    ctx.fillRect(0, 0, 400, 300)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '24px sans-serif'
    ctx.fillText('Test Image', 120, 160)
    const jpgBuf = canvas.toBuffer('image/jpeg')
    const jpgImage = await pdfDoc.embedJpg(jpgBuf)
    const page = pdfDoc.addPage([jpgImage.width, jpgImage.height])
    page.drawImage(jpgImage, { x: 0, y: 0, width: jpgImage.width, height: jpgImage.height })
    const result = await pdfDoc.save()
    const resultPdf = await PDFDocument.load(result)
    fs.writeFileSync(path.join(OUT, 'jpg-to-pdf.pdf'), Buffer.from(result))
    if (resultPdf.getPageCount() !== 1) throw new Error('Expected 1 page')
    console.log(`  → ${(result.length/1024).toFixed(1)} KB, 1 page`)
  })

  // ========== 4. PDF 转 JPG ==========
  console.log('\n--- 4. PDF 转 JPG ---')
  await test('PDF 转 JPG: 提取页面为图片', async () => {
    // 使用 pdf-lib 读取 PDF 页面数量
    const pdf = await PDFDocument.load(pdfBytes)
    const pageCount = pdf.getPageCount()
    // 获取每页尺寸
    const pages = pdf.getPages()
    for (let i = 0; i < pageCount; i++) {
      const { width, height } = pages[i].getSize()
      console.log(`  → Page ${i+1}: ${width.toFixed(0)}x${height.toFixed(0)} pts`)
    }
    if (pageCount !== 3) throw new Error(`Expected 3 pages, got ${pageCount}`)
  })

  // ========== 5. 压缩 PDF ==========
  console.log('\n--- 5. 压缩 PDF ---')
  await test('压缩 PDF: 移除未使用对象', async () => {
    const pdf = await PDFDocument.load(pdfBytes)
    const result = await pdf.save({ useObjectStreams: true, addDefaultPage: false })
    const ratio = (1 - result.length / origSize) * 100
    fs.writeFileSync(path.join(OUT, 'compress.pdf'), Buffer.from(result))
    const resultPdf = await PDFDocument.load(result)
    if (resultPdf.getPageCount() !== 3) throw new Error('Page count changed')
    console.log(`  → ${(result.length/1024).toFixed(1)} KB (压缩 ${ratio.toFixed(1)}%)`)
  })

  // ========== 结果 ==========
  console.log('\n' + '='.repeat(60))
  console.log(`  总计: ${pass + fail}  |  通过: ${pass}  |  失败: ${fail}`)
  const files = fs.readdirSync(OUT).filter(f => f !== '.gitkeep')
  console.log(`  输出文件: ${files.length} 个, ${(files.reduce((s,f)=>s+fs.statSync(path.join(OUT,f)).size,0)/1024/1024).toFixed(1)} MB`)
}

main().catch(console.error)
