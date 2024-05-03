import { NextRequest, NextResponse } from 'next/server'

export default function middxleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = (request.nextUrl.host.endsWith("vercel.app") ? `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' https://beamanalytics.b-cdn.net/beam.min.js https://vercel.live/_next-live/feedback/feedback.js;
  style-src 'self' 'sha256-6PybBlUBf2pH44fiFF99sMcmG/1hNoTvzrIl2o1Fo/U=';
  object-src 'none';
  base-uri 'self';
  connect-src 'self' https://lb1.beamanalytics.io https://vercel.live wss://ws-us3.pusher.com;
  font-src 'self';
  frame-src 'self' https://vercel.live https://calendly.com;
  img-src 'self' https://vercel.com;
  manifest-src 'self';
  media-src 'self';
  report-uri https://66355865f3e5e33c49804ef2.endpoint.csper.io/?v=0;
  worker-src 'none';
` : `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://beamanalytics.b-cdn.net/beam.min.js ;
    script-src-elem 'self' https://carvido.net https://www.carvido.net https://beamanalytics.b-cdn.net/beam.min.js https://vercel.live/_next-live/feedback/feedback.js 'sha256-Q+8tPsjVtiDsjF/Cv8FMOpg2Yg91oKFKDAJat1PPb2g=' 'sha256-ntyubDIImZrqm+Qc2pOmYflh6HiLu1qbJiBTUFMEJIA=';
    style-src 'self' 'sha256-6PybBlUBf2pH44fiFF99sMcmG/1hNoTvzrIl2o1Fo/U=';
    object-src 'none';
    child-src 'none';
    base-uri 'self';
    connect-src https://lb1.beamanalytics.io/api/log;
    font-src 'self';
    frame-src 'self' https://calendly.com;
    img-src 'self';
    manifest-src 'self';
    media-src 'self';
    worker-src 'none';
    require-trusted-types-for 'script'
`)
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  const response = NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  return response
}
