import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  ConnectionMode,
  Panel,
} from 'reactflow';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

import { SkillNode as SkillNodeComponent } from '../components/SkillNode';
import { SkillNodeModal } from '../components/SkillNodeModal';
import { ProgressSidebar } from '../components/ProgressSidebar';
import { TreeControls } from '../components/TreeControls';
import { useAuthStore } from '../stores/authStore';
import { useSkillTreeStore } from '../stores/skillTreeStore';
import { skillTreeData } from '@shared/data/skillTreeData';
import { SkillNode } from '@shared/types';

// Define custom node types
const nodeTypes = {
  skillNode: SkillNodeComponent,
};

export const SkillTreePage: React.FC = () => {
  const { user, updateUserProgress } = useAuthStore();
  const { 
    selectedNode, 
    setSelectedNode, 
    filter, 
    setFilter,
    showOnlyAvailable,
    setShowOnlyAvailable 
  } = useSkillTreeStore();

  // Convert skill tree data to React Flow format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const completedNodes = user?.progress.completedNodes || [];
    const recommendedPath = user?.progress.aiRecommendedPath || [];

    // Create nodes
    const nodes: Node[] = skillTreeData.map((skillNode: SkillNode) => {
      const isCompleted = completedNodes.includes(skillNode.id);
      const isRecommended = recommendedPath.includes(skillNode.id);
      const canUnlock = skillNode.prerequisites.every(prereqId => 
        completedNodes.includes(prereqId)
      );

      let nodeStatus: 'locked' | 'available' | 'completed' | 'recommended' = 'locked';
      if (isCompleted) {
        nodeStatus = 'completed';
      } else if (isRecommended) {
        nodeStatus = 'recommended';
      } else if (canUnlock || skillNode.prerequisites.length === 0) {
        nodeStatus = 'available';
      }

      return {
        id: skillNode.id,
        type: 'skillNode',
        position: skillNode.position,
        data: {
          ...skillNode,
          status: nodeStatus,
          isCompleted,
          isRecommended,
          canUnlock,
          onSelect: () => setSelectedNode(skillNode),
          onComplete: () => handleNodeComplete(skillNode.id),
        },
        draggable: false,
      };
    });

    // Create edges
    const edges: Edge[] = [];
    skillTreeData.forEach((skillNode: SkillNode) => {
      skillNode.connections.forEach((connection) => {
        const sourceCompleted = completedNodes.includes(skillNode.id);
        const targetCompleted = completedNodes.includes(connection.targetNodeId);
        const isRecommendedPath = recommendedPath.includes(skillNode.id) && 
                                  recommendedPath.includes(connection.targetNodeId);

        let edgeClass = 'connection-line';
        if (isRecommendedPath) {
          edgeClass = 'connection-line-recommended';
        } else if (sourceCompleted || targetCompleted) {
          edgeClass = 'connection-line-active';
        }

        edges.push({
          id: `${skillNode.id}-${connection.targetNodeId}`,
          source: skillNode.id,
          target: connection.targetNodeId,
          type: 'smoothstep',
          animated: isRecommendedPath,
          style: {
            stroke: isRecommendedPath ? '#8b5cf6' : 
                   (sourceCompleted || targetCompleted) ? '#3b82f6' : '#475569',
            strokeWidth: isRecommendedPath ? 3 : 2,
          },
          className: edgeClass,
        });
      });
    });

    return { nodes, edges };
  }, [user?.progress, setSelectedNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeComplete = useCallback((nodeId: string) => {
    const currentCompleted = user?.progress.completedNodes || [];
    const newCompleted = [...currentCompleted, nodeId];
    
    // Calculate XP reward
    const node = skillTreeData.find(n => n.id === nodeId);
    const xpGain = node?.xpReward || 0;
    const newTotalXP = (user?.progress.totalXP || 0) + xpGain;
    const newLevel = Math.floor(newTotalXP / 1000) + 1;

    updateUserProgress({
      completedNodes: newCompleted,
      totalXP: newTotalXP,
      level: newLevel,
    });

    // Show celebration animation
    // TODO: Implement unlock animation
  }, [user?.progress, updateUserProgress]);

  const filteredNodes = useMemo(() => {
    if (!filter && !showOnlyAvailable) return nodes;

    return nodes.filter((node) => {
      const skillNode = node.data as SkillNode & { status: string };
      
      if (filter && skillNode.category !== filter) return false;
      if (showOnlyAvailable && skillNode.status === 'locked') return false;
      
      return true;
    });
  }, [nodes, filter, showOnlyAvailable]);

  return (
    <div className="h-screen w-full relative bg-background-primary">
      {/* Progress Sidebar */}
      <ProgressSidebar />

      {/* Main Skill Tree */}
      <div className="h-full w-full">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          className="skill-tree-canvas"
          proOptions={{ hideAttribution: true }}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background 
            variant="dots" 
            gap={20} 
            size={2}
            className="opacity-20"
            color="#334155"
          />
          
          <Controls 
            className="react-flow-controls"
            showInteractive={false}
          />
          
          <MiniMap 
            className="react-flow-minimap"
            nodeStrokeWidth={3}
            nodeColor={(node) => {
              const status = (node.data as any).status;
              switch (status) {
                case 'completed': return '#10b981';
                case 'recommended': return '#8b5cf6';
                case 'available': return '#fbbf24';
                default: return '#475569';
              }
            }}
          />

          {/* Custom Panel with Controls */}
          <Panel position="top-left">
            <TreeControls />
          </Panel>

          {/* Legend Panel */}
          <Panel position="bottom-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect p-4 rounded-lg text-sm space-y-2"
            >
              <h3 className="font-semibold text-text-primary mb-2">Legend</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-skill-locked"></div>
                <span className="text-text-secondary">Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-skill-available animate-glow"></div>
                <span className="text-text-secondary">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-skill-completed"></div>
                <span className="text-text-secondary">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-skill-recommended animate-pulse"></div>
                <span className="text-text-secondary">Recommended</span>
              </div>
            </motion.div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <SkillNodeModal
          node={selectedNode}
          isOpen={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          onComplete={() => {
            handleNodeComplete(selectedNode.id);
            setSelectedNode(null);
          }}
        />
      )}
    </div>
  );
};