/**
 * 测试 PDF 旋转功能
 */
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const TEST_PDF = path.join(__dirname, 'public/test-rotate.pdf')
const OUT = path.join(__dirname, 'test-rotate-output')
fs.mkdirSync(OUT, { recursive: true })

async function test() {
  const pdfBytes = fs.readFileSync(TEST_PDF)
  console.log(`原始 PDF: ${(pdfBytes.length/1024).toFixed(1)} KB`)

  const pdf = await PDFDocument.load(pdfBytes)
  console.log(`页数: ${pdf.getPageCount()}`)
  
  const pages = pdf.getPages()
  for (let i = 0; i < pages.length; i++) {
    const rot = pages[i].getRotation()
    console.log(`Page ${i+1}: 当前旋转=${rot.angle}°`)
  }

  // 测试 90° 旋转
  console.log('\n--- 旋转 90° ---')
  const pdf2 = await PDFDocument.load(pdfBytes)
  const pages2 = pdf2.getPages()
  const normalized = ((90 % 360) + 360) % 360
  pages2.forEach(page => {
    page.setRotation({ angle: normalized })
  })
  const rotated = await pdf2.save()
  fs.writeFileSync(path.join(OUT, 'rotated-90.pdf'), Buffer.from(rotated))
  
  // 验证旋转后的 PDF
  const checkPdf = await PDFDocument.load(rotated)
  const checkPages = checkPdf.getPages()
  for (let i = 0; i < checkPages.length; i++) {
    const rot = checkPages[i].getRotation()
    console.log(`Page ${i+1}: 旋转后=${rot.angle}°`)
  }
  console.log(`大小: ${(rotated.length/1024).toFixed(1)} KB`)

  // 测试 180° 旋转
  console.log('\n--- 旋转 180° ---')
  const pdf3 = await PDFDocument.load(pdfBytes)
  const pages3 = pdf3.getPages()
  const normalized180 = ((180 % 360) + 360) % 360
  pages3.forEach(page => {
    page.setRotation({ angle: normalized180 })
  })
  const rotated180 = await pdf3.save()
  fs.writeFileSync(path.join(OUT, 'rotated-180.pdf'), Buffer.from(rotated180))
  
  const checkPdf2 = await PDFDocument.load(rotated180)
  const checkPages2 = checkPdf2.getPages()
  for (let i = 0; i < checkPages2.length; i++) {
    const rot = checkPages2[i].getRotation()
    console.log(`Page ${i+1}: 旋转后=${rot.angle}°`)
  }

  console.log('\n✅ 测试完成')
}

test().catch(console.error)
