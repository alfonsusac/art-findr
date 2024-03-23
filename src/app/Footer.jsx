import { TextLogo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-primary/20 min-h-48 flex">
      <div className="content flex flex-col">
        <div className="content p-8 flex justify-between grow">
          <div className="">
            <TextLogo />
          </div>
          <div className="text-end flex flex-col gap-2">
            <div className="text-primary font-semibold">Company</div>
            <div>About us</div>
            <div>Blog</div>
            <div>Careers</div>
            <div>Press</div>
            <div>Partner with us</div>
          </div>
          <div className="text-end flex flex-col gap-2">
            <div className="text-primary font-semibold">Resources</div>
            <div>Help center</div>
            <div>Contact support</div>
            <div>Community</div>
            <div>For Mitra</div>
            <div>For Seekers</div>
          </div>
        </div>
        <div className="flex justify-between py-5 border-t border-black/20 text-sm mx-8">
          <div className="flex gap-2">
            <div>© 2024 Hackhive</div>
            <div>·</div>
            <div>Privacy</div>
            <div>Terms</div>
            <div>Sitemap</div>
          </div>
          <div className="flex gap-2">
            <div>Instagram</div>
            <div>Facebook</div>
          </div>
        </div>
      </div>
    </footer>
  )
}