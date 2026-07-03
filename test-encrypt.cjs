/**
 * 测试 @pdfsmaller/pdf-encrypt-lite PDF 加密功能
 */
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const TEST_PDF = path.join(__dirname, 'public/test.pdf')
const OUT = path.join(__dirname, 'test-encrypt-output')
fs.mkdirSync(OUT, { recursive: true })

async function test() {
  // 使用之前测试过的 PDF 文件
  const testFiles = [
    path.join(__dirname, 'public/test.pdf'),
  ]
  
  // 检查 test.pdf 是否存在
  if (!fs.existsSync(testFiles[0])) {
    // 创建一个测试 PDF
    const doc = await PDFDocument.create()
    doc.addPage([595, 842])
    doc.addPage([595, 842])
    const bytes = await doc.save()
    fs.writeFileSync(testFiles[0], Buffer.from(bytes))
    console.log(`创建测试 PDF: ${(bytes.length/1024).toFixed(1)} KB, 2 页`)
  }

  const pdfBytes = fs.readFileSync(testFiles[0])
  console.log(`原始 PDF: ${(pdfBytes.length/1024).toFixed(1)} KB`)

  // 1. 使用 pdf-encrypt-lite 加密
  const { encryptPDF, decryptPDF } = require('@pdfsmaller/pdf-encrypt-lite')
  
  const password = 'test123'
  
  console.log('\n--- 加密测试 ---')
  try {
    const encrypted = await encryptPDF(pdfBytes, password)
    fs.writeFileSync(path.join(OUT, 'encrypted.pdf'), Buffer.from(encrypted))
    console.log(`加密后: ${(encrypted.length/1024).toFixed(1)} KB`)
    
    // 检查是否包含加密标记
    const str = Buffer.from(encrypted).toString('utf8')
    console.log(`包含 /Encrypt: ${str.includes('/Encrypt')}`)
    console.log(`包含 /Filter: ${str.includes('/Filter')}`)
  } catch (e) {
    console.log(`加密失败: ${e.message}`)
    return
  }

  // 2. 尝试无密码打开
  console.log('\n--- 无密码打开 ---')
  try {
    const encrypted = fs.readFileSync(path.join(OUT, 'encrypted.pdf'))
    const pdf = await PDFDocument.load(encrypted)
    console.log(`❌ 无密码打开成功 (${pdf.getPageCount()} 页) - 加密未生效`)
  } catch (e) {
    console.log(`✅ 无密码打开失败: ${e.message}`)
  }

  // 3. 用密码解密
  console.log('\n--- 用密码解密 ---')
  try {
    const encrypted = fs.readFileSync(path.join(OUT, 'encrypted.pdf'))
    const decrypted = await decryptPDF(encrypted, password)
    fs.writeFileSync(path.join(OUT, 'decrypted.pdf'), Buffer.from(decrypted))
    const pdf = await PDFDocument.load(decrypted)
    console.log(`✅ 解密成功 (${pdf.getPageCount()} 页)`)
  } catch (e) {
    console.log(`❌ 解密失败: ${e.message}`)
  }

  // 4. 用错误密码解密
  console.log('\n--- 错误密码解密 ---')
  try {
    const encrypted = fs.readFileSync(path.join(OUT, 'encrypted.pdf'))
    await decryptPDF(encrypted, 'wrongpassword')
    console.log(`❌ 错误密码解密成功 - 有问题`)
  } catch (e) {
    console.log(`✅ 错误密码解密失败: ${e.message}`)
  }
}

test().catch(console.error)
