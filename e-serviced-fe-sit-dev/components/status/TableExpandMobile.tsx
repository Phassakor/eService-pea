import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StepProgressBarVertical from "./StepProgressBarVertical";

export default function TableExpandMobile(props) {
  const row = props.row;
  return (
    <div className="bg-[#FDFAFE] -mx-6 p-2">
      <TableContainer className="mb-4">
        <Table>
          <TableHead className="bg-[#8E0369]">
            <TableRow>
              <TableCell>
                <div className="font-NotoSansThai text-white">สถานะ</div>
              </TableCell>
              <TableCell>
                <div className="font-NotoSansThai text-white">
                  วันที่สร้างคำร้อง
                </div>
              </TableCell>
              <TableCell>
                <div className="font-NotoSansThai text-white">
                  วันที่อัปเดทล่าสุด
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <div className="font-NotoSansThai">{row.status}</div>
              </TableCell>
              <TableCell>
                <div className="font-NotoSansThai">{row.created_date}</div>
              </TableCell>
              <TableCell>
                <div className="font-NotoSansThai">{row.updated_date}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="rotate-90 mt-48 mb-64">
        <StepProgressBarVertical statusTracking={row.status_tracking} />
      </div>
      <div className="-mt-8 mx-6">
        <div className="text-left mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, fugiat
          eius. Exercitationem autem non nemo fugiat perferendis. Fugit, ut
          inventore.
        </div>
        <div className=" ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquid
          voluptate dolor deleniti debitis similique vel repudiandae voluptas
          quasi, corporis illum velit eos, dolorem illo exercitationem nam,
          aliquam qui sit. Dolorum aliquam mollitia praesentium ut blanditiis
          cum commodi, odit provident!
        </div>
      </div>
    </div>
  );
}
