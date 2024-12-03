import { Table } from "lucide-react";
import { TableHeader, TableRow, TableHead, TableBody } from "../ui/table";

const SttHistory:React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Transcript History</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead>Transcript</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {transcriptHistory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.timestamp}</TableCell>
                            <TableCell className="max-w-md truncate">{item.text}</TableCell>
                            <TableCell>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromHistory(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete transcript</span>
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SttHistory;