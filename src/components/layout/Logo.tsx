'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  className?: string
}

export function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { circle: 32, text: 'text-lg' },
    md: { circle: 44, text: 'text-xl' },
    lg: { circle: 64, text: 'text-3xl' },
  }

  const { circle, text } = sizes[size]

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Circular blue logo with white "N" */}
      <div
        className="flex items-center justify-center rounded-full bg-blue-600"
        style={{ width: circle, height: circle }}
      >
        <span
          className="font-bold text-white"
          style={{ fontSize: circle * 0.5 }}
        >
          N
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className={`font-bold text-blue-900 tracking-wide ${text}`}>
          NORNEX
        </span>
        {showTagline && (
          <span className="text-xs text-gray-600">
            NORNEX— Build, Repair, Protect.
          </span>
        )}
      </div>
    </Link>
  )
}

export function LogoIcon({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-blue-600"
      style={{ width: size, height: size }}
    >
      <span
        className="font-bold text-white"
        style={{ fontSize: size * 0.5 }}
      >
        N
      </span>
    </div>
  )
}
