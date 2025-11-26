import { NextResponse } from "next/server";

interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
}

// Social media links - in production this would come from the database
const socialMediaLinks: SocialMediaLink[] = [
  {
    platform: "Facebook",
    url: "https://facebook.com/nornex",
    icon: "facebook",
    isActive: true,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/company/nornex",
    icon: "linkedin",
    isActive: true,
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/nornex",
    icon: "instagram",
    isActive: true,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/nornex",
    icon: "twitter",
    isActive: true,
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/nornex",
    icon: "youtube",
    isActive: true,
  },
];

export async function GET() {
  try {
    // In production, this would fetch from database:
    // const links = await prisma.socialAccount.findMany({
    //   where: { isActive: true },
    //   select: { platform: true, accountName: true },
    // });

    const activeLinks = socialMediaLinks.filter((link) => link.isActive);

    return NextResponse.json(
      { 
        success: true,
        links: activeLinks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Social media API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch social media links" },
      { status: 500 }
    );
  }
}
