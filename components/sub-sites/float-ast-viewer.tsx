"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { FloatAST, ASTNode, ProcessedASTNode } from "@/types/float-ast"
import { ChevronDown, ChevronRight } from "lucide-react"

interface FloatASTViewerProps {
  data: FloatAST
}

const getNodeTypeColor = (type?: string): string => {
  switch (type) {
    case "thematic_thread":
      return "border-blue-500/50 text-blue-400"
    case "persona_origin":
      return "border-purple-500/50 text-purple-400"
    case "system_concept":
      return "border-green-500/50 text-green-400"
    case "technical_component":
      return "border-amber-500/50 text-amber-400"
    case "methodology":
      return "border-teal-500/50 text-teal-400"
    case "application":
      return "border-indigo-500/50 text-indigo-400"
    case "system_capability":
      return "border-cyan-500/50 text-cyan-400"
    case "design_principle":
      return "border-rose-500/50 text-rose-400"
    case "philosophical_stance":
      return "border-orange-500/50 text-orange-400"
    default:
      return "border-emerald-500/50 text-emerald-400"
  }
}

interface TreeNodeProps {
  node: ProcessedASTNode
  toggleNode: (nodeId: string) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, toggleNode }) => {
  const hasChildren = node.childNodes && node.childNodes.length > 0
  const nodeTypeColor = getNodeTypeColor(node.type)
  const paddingLeft = node.depth ? `${node.depth * 1.5}rem` : "0"

  const handleToggle = () => {
    toggleNode(node.node_id)
  }

  return (
    <div className="tree-node">
      <div
        className="node-header flex items-start py-3 border-b border-border/10 hover:bg-emerald-500/5 transition-colors cursor-pointer font-mono"
        onClick={handleToggle}
        style={{
          paddingLeft,
        }}
      >
        <div className="toggle mr-2 mt-1 text-emerald-500/70">
          {hasChildren && (node.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-medium text-emerald-400">{node.label}</h3>
            {node.type && (
              <span className={`text-xs px-2 py-0.5 border rounded-none ${nodeTypeColor}`}>{node.type}</span>
            )}
            <span className="text-xs text-muted-foreground">{node.node_id}</span>
          </div>
          {node.description && <p className="text-sm text-muted-foreground mb-2">{node.description}</p>}
          {node.expanded && node.payload && (
            <div className="node-payload mt-3 bg-muted/10 border border-emerald-500/10 rounded-none p-3">
              {Object.entries(node.payload).map(([key, value]) => (
                <div key={key} className="mb-2 last:mb-0">
                  <h4 className="text-sm font-medium text-emerald-400/70">{key}</h4>
                  {Array.isArray(value) ? (
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                      {value.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">{String(value)}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {node.expanded && node.childNodes && node.childNodes.length > 0 && (
        <div className="node-children border-l border-emerald-500/10 ml-4">
          {node.childNodes.map((childNode) => (
            <TreeNode key={childNode.node_id} node={childNode} toggleNode={toggleNode} />
          ))}
        </div>
      )}
    </div>
  )
}

const FloatASTViewer: React.FC<FloatASTViewerProps> = ({ data }) => {
  const [processedTree, setProcessedTree] = useState<ProcessedASTNode | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    if (data) {
      // Extract metadata
      const { version, uid, title, tags, status, scope, meta_focus, parsing_tree_meta, root, nodes } = data.float_ast

      setMetadata({
        version,
        uid,
        title,
        tags,
        status,
        scope,
        meta_focus,
        parsing_tree_meta,
      })

      // Process the tree
      const processedRoot = processNode(root, nodes)
      setProcessedTree(processedRoot)
    }
  }, [data])

  const processNode = (node: ASTNode, allNodes: ASTNode[], depth = 0): ProcessedASTNode => {
    const processedNode: ProcessedASTNode = {
      ...node,
      expanded: depth < 1,
      depth,
      childNodes: [],
    }

    if (node.children && node.children.length > 0) {
      processedNode.childNodes = node.children
        .map((childId) => {
          const childNode = allNodes.find((n) => n.node_id === childId)
          if (childNode) {
            return processNode(childNode, allNodes, depth + 1)
          }
          return null
        })
        .filter(Boolean) as ProcessedASTNode[]
    }

    return processedNode
  }

  const toggleNode = (nodeId: string) => {
    const toggleNodeRecursive = (node: ProcessedASTNode): ProcessedASTNode => {
      if (node.node_id === nodeId) {
        return {
          ...node,
          expanded: !node.expanded,
        }
      }
      if (node.childNodes) {
        return {
          ...node,
          childNodes: node.childNodes.map(toggleNodeRecursive),
        }
      }
      return node
    }

    if (processedTree) {
      setProcessedTree(toggleNodeRecursive(processedTree))
    }
  }

  if (!processedTree || !metadata) {
    return <div className="flex justify-center items-center h-64">Loading FloatAST...</div>
  }

  return (
    <div className="float-ast-viewer w-full min-h-screen bg-black text-foreground py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-emerald-400">FloatAST Visualization</h1>
          <p className="text-muted-foreground max-w-2xl">
            A cognitive prosthetic for neurodivergent thinking - visualizing the hierarchical structure of ideas,
            conversations, and cognitive processes in the FLOAT system.
          </p>
        </header>

        <div className="metadata border border-emerald-500/20 bg-background/50 p-6 rounded-none mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-mono text-emerald-400 mb-4">{metadata.title}</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {metadata.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-sm rounded-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground mb-2 font-mono">
                <span className="text-emerald-400">UID:</span> {metadata.uid}
              </div>
              <div className="text-sm text-muted-foreground mb-2 font-mono">
                <span className="text-emerald-400">Version:</span> {metadata.version}
              </div>
              <div className="text-sm text-muted-foreground mb-2 font-mono">
                <span className="text-emerald-400">Status:</span> {metadata.status}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-emerald-400 mb-2">Scope</h3>
              <p className="text-sm mb-3 text-muted-foreground">{metadata.scope}</p>
              <h3 className="font-mono text-emerald-400 mb-2">Meta Focus</h3>
              <ul className="list-disc pl-4 mb-3 space-y-1">
                {metadata.meta_focus.map((focus: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {focus}
                  </li>
                ))}
              </ul>
              <h3 className="font-mono text-emerald-400 mb-2">Parsing Strategy</h3>
              <p className="text-sm text-muted-foreground">{metadata.parsing_tree_meta.strategy}</p>
            </div>
          </div>
        </div>

        <div className="tree-container border border-emerald-500/20 bg-background/50 p-4 rounded-none">
          <TreeNode node={processedTree} toggleNode={toggleNode} />
        </div>
      </div>
    </div>
  )
}

export default FloatASTViewer
