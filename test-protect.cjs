/**
 * 测试 PDF 密码保护功能
 */
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const TEST_PDF = path.join(__dirname, 'public/test-protect.pdf')
const OUT_DIR = path.join(__dirname, 'test-protect-output')
fs.mkdirSync(OUT_DIR, { recursive: true })

async function test() {
  const pdfBytes = fs.readFileSync(TEST_PDF)
  console.log(`原始 PDF: ${(pdfBytes.length/1024).toFixed(1)} KB, ${(await PDFDocument.load(pdfBytes)).getPageCount()} 页`)

  // 1. 加密 PDF
  const pdf = await PDFDocument.load(pdfBytes)
  const encrypted = await pdf.save({ userPassword: 'test123', ownerPassword: 'test123' })
  fs.writeFileSync(path.join(OUT_DIR, 'protected.pdf'), Buffer.from(encrypted))
  console.log(`加密后: ${(encrypted.length/1024).toFixed(1)} KB`)

  // 2. 尝试无密码打开
  try {
    const opened = await PDFDocument.load(encrypted)
    console.log(`❌ 无密码打开成功 (${opened.getPageCount()} 页) - 密码保护可能未生效`)
  } catch (e) {
    console.log(`✅ 无密码打开失败: ${e.message}`)
  }

  // 3. 用密码打开
  try {
    const openedWithPw = await PDFDocument.load(encrypted, { password: 'test123' })
    console.log(`✅ 用密码打开成功 (${openedWithPw.getPageCount()} 页)`)
  } catch (e) {
    console.log(`❌ 用密码打开失败: ${e.message}`)
  }

  // 4. 用错误密码打开
  try {
    await PDFDocument.load(encrypted, { password: 'wrong' })
    console.log(`❌ 错误密码打开成功 - 有问题`)
  } catch (e) {
    console.log(`✅ 错误密码打开失败: ${e.message}`)
  }
}

test().catch(console.error)
