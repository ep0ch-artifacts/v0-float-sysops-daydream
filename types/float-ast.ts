export interface FloatAST {
  float_ast: {
    version: string
    uid: string
    title: string
    tags: string[]
    status: string
    scope: string
    meta_focus: string[]
    parsing_tree_meta: {
      strategy: string
      approach_rationale: string
      contagion_method: string
    }
    root: ASTNode
    nodes: ASTNode[]
  }
}

export interface ASTNode {
  node_id: string
  label: string
  description?: string
  type?: string
  payload?: {
    [key: string]: any
  }
  children?: string[]
}

export interface ProcessedASTNode extends ASTNode {
  childNodes?: ProcessedASTNode[]
  expanded?: boolean
  depth?: number
}
