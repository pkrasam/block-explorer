import Transaction from './Transaction'

export interface BlockIdentifier {
  hash: string
  index: number
}

export default interface Block {
  parent_block_identifier?: BlockIdentifier
  block_identifier: BlockIdentifier
  metadata: {
    size: number
    difficulty: number
    transactionsCount?: number
  }
  transactions: Array<Transaction>
  timestamp: Date
}

export interface Blocks {
  blocks: Block[]
}

export const formatBlockFromJson = ({ block }: any): Block => ({
  ...block,
  timestamp: new Date(block.timestamp),
})

export const formatBlocksFromJson = ({ blocks }: any): Block[] =>
  blocks.map((block: any) => ({
    ...formatBlockFromJson({ block }),
  }))

export function isBlock(x: any): x is Block {
  return typeof x === 'object' && 'block_identifier' in x && !('transaction_identifier' in x)
}
