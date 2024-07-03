import React, { ReactNode } from "react";
import { Button, Card, CardBody, Link } from "@nextui-org/react"

interface CardContentProps {
    title?: string;
    children: ReactNode;
  }
type Props = {
  title?: string;
  children?: ReactNode;
};


// const Layout: React.FC<CardContentProps> = ({ title,children }) => (
//     <div className={NotoSans.className}>
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   );
  
//   export default Layout;

export default function CardContent({ title, children }: Props) {
  return (
    <CardBody className="lg:p-8 p-4">
      {/*------- header card ------ */}
      <div>
        <div className="mx-0">
          <div className="font-bold lg:text-2xl text-large text-[#8E0369] mb-1 ">
            {title}
          </div>
          <div className="w-full h-1 bg-[#FAFBFC]"></div>
        </div>
      </div>
      {/*------- body card ------ */}
      {children}
      {/*------- footer card ------ */}
      <div className="font-NotoSansThai my-4">
        <Link href={"/"} className="lg:w-1/5 w-full">
          <Button className="bg-[#C7C7C7] text-white w-full rounded">
            กลับ
          </Button>
        </Link>
      </div>
    </CardBody>
  );
}
