import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Noto_Sans_Thai } from "next/font/google";
import { Card } from "@nextui-org/react";
import SuccessForm from "@/components/serviceForm/components/SuccessForm";
interface LayoutProps {
  children?: ReactNode;
  isSuccess?: boolean;
}
const NotoSans = Noto_Sans_Thai({
  subsets: ["latin"],
  display: "swap",
});
const Layout: React.FC<LayoutProps> = ({ children, isSuccess = false }) => (
  <div className={NotoSans.className}>
    <div className="min-h-screen bg-[#FAFBFC]">
    <Header />
    <div className="relative w-full md:p-[2.625rem_80px_4.375rem_80px] lg:p-[2.625rem_120px_4.375rem_120px]">
      <Card className="relative w-full shadow-[0_4px_20px_0px_rgba(235,229,229,0.50)] max-md:rounded-none">
        {<>{isSuccess ? <SuccessForm /> : children}</>}
      </Card>
    </div>
    <div className="sticky top-[100vh]">
    <Footer  />
    </div>
    </div>
   
  </div>
);

export default Layout;
export const metadata = {
  title: "แบบฟอร์ม",
};