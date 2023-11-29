import { NextRequest, NextResponse } from 'next/server'

export default function middxleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://beamanalytics.b-cdn.net/beam.min.js ;
    script-src-elem 'self' https://beamanalytics.b-cdn.net/beam.min.js 'sha256-Q+8tPsjVtiDsjF/Cv8FMOpg2Yg91oKFKDAJat1PPb2g=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-8ABa/AowV56VLApPm4uNkyH3tFD89PmvWsG/HYdPCAc=' 'sha256-5XOS1wAp+ac/V8P9OZySa92AvRHTg2VyEp5fCJPw9Fg=' 'sha256-CfZbleM5BGMitBWG+Zumg+dkxUonPTeOEr8YpPSxGX4=' 'sha265-9qeVkVInA1iS/SnxdmfCts3hbHQ0RLud2nQJ0zmSUWM=';
    style-src 'self';
    object-src 'none';
    child-src 'none';
    base-uri 'self';
    connect-src https://lb1.beamanalytics.io/api/log ;
    font-src 'self';
    frame-src 'self';
    img-src 'self';
    manifest-src 'self';
    media-src 'self';
    worker-src 'none';
    require-trusted-types-for 'script'
`
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
