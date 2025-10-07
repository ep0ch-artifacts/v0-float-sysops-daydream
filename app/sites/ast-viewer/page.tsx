import FloatASTViewer from "@/components/sub-sites/float-ast-viewer"
import { floatASTData } from "@/data/float-ast-data"

export default function ASTViewerPage() {
  return <FloatASTViewer data={floatASTData} />
}
