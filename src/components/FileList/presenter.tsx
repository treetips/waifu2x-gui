import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FileDataDto } from "../../types/FileDataDto";

type Props = {
  fileDataDtos: FileDataDto[];
};

export const FileListPresenter = ({ fileDataDtos }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ height: 307 }}>
      <Table sx={{ width: "100%" }} size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 10 }}>No.</TableCell>
            <TableCell>File name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fileDataDtos.map((fileDataDto, index) => (
            <TableRow
              key={fileDataDto.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{fileDataDto.fileName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
