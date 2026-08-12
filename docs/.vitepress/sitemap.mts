import fs from 'node:fs'
import path from 'node:path'

/**
 * 构建结束后自动生成 sitemap.xml 与 robots.txt：
 * - sitemap.xml：遍历 dist 下全部页面（含中英文），带 lastmod
 * - robots.txt：允许所有爬虫 + 声明 Sitemap 地址，供搜索引擎自动发现
 *
 * 通过 VitePress 的 buildEnd 选项调用（页面全部渲染完成后执行）。
 * 纯公开信息，无任何密钥，可安全进入公开仓库。
 */
const SITE_URL = 'https://sip.hotsouprealm.top'

function walkHtml(dir: string, base = ''): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name).replace(/\\/g, '/')
    if (entry.isDirectory()) {
      out.push(...walkHtml(path.join(dir, entry.name), rel))
    } else if (entry.name === 'index.html') {
      out.push(rel === 'index.html' ? '' : rel.replace(/index\.html$/, ''))
    } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
      out.push(rel)
    }
  }
  return out
}

function enc(p: string): string {
  return p.split('/').map(encodeURIComponent).join('/')
}

export function generateSitemap(): void {
  const outDir = path.resolve(process.cwd(), 'docs/.vitepress/dist')
  if (!fs.existsSync(outDir)) return
  const pages = walkHtml(outDir).sort()
  const today = new Date().toISOString().slice(0, 10)

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(
      (p) =>
        `  <url><loc>${SITE_URL}/${enc(p)}</loc><lastmod>${today}</lastmod></url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)

  const robots = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robots)

  console.log(`[vitepress-sitemap] generated ${pages.length} URLs`)
}
