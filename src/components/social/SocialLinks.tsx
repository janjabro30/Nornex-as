'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'

// TikTok icon component (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

interface SocialAccount {
  platform: string
  profileUrl: string
  isActive: boolean
}

// These would normally come from the database
const socialAccounts: SocialAccount[] = [
  { platform: 'facebook', profileUrl: 'https://facebook.com/nornexas', isActive: true },
  { platform: 'instagram', profileUrl: 'https://instagram.com/nornexas', isActive: true },
  { platform: 'linkedin', profileUrl: 'https://linkedin.com/company/nornexas', isActive: true },
  { platform: 'tiktok', profileUrl: 'https://tiktok.com/@nornexas', isActive: true },
]

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
}

interface SocialLinksProps {
  className?: string
  iconSize?: string
}

export function SocialLinks({ className = '', iconSize = 'w-5 h-5' }: SocialLinksProps) {
  const activeAccounts = socialAccounts.filter((account) => account.isActive)

  if (activeAccounts.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {activeAccounts.map((account) => {
        const Icon = platformIcons[account.platform]
        if (!Icon) return null

        return (
          <a
            key={account.platform}
            href={account.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            aria-label={`Follow us on ${account.platform}`}
          >
            <Icon className={iconSize} />
          </a>
        )
      })}
    </div>
  )
}
