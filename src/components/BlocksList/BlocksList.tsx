import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import NavigateNext from '@material-ui/icons/NavigateNext'

import Block from '../../types/Block'
import { getBlockDetailPageUrl } from '../../utils/routes'
import { StyledTableCell, StyledTableRow } from '../Table/Table'
import { getDisplayTimestamp } from '../../utils/time'
import { getDisplaySizeInBytes } from '../../utils/size'

interface Prop {
  blockList: Block[]
}

const BlocksList = ({ blockList }: Prop) => {
  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>{t('app.components.blockslist.height')}</StyledTableCell>
            <StyledTableCell align='right'>
              {t('app.components.blockslist.size')}
            </StyledTableCell>
            <StyledTableCell align='right'>
              {t('app.components.blockslist.transactions')}
            </StyledTableCell>
            <StyledTableCell align='left'>
              {t('app.components.blockslist.hash')}
            </StyledTableCell>
            <StyledTableCell align='right'>
              {t('app.components.blockslist.timestamp')}
            </StyledTableCell>
            <StyledTableCell align='right'>
              {t('app.components.blockslist.actions')}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blockList.map((block: Block) => (
            <StyledTableRow key={String(block.block_identifier.hash)}>
              <StyledTableCell scope='row'>
                <Link to={getBlockDetailPageUrl(block.block_identifier.index)}>
                  {block.block_identifier.index}
                </Link>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {getDisplaySizeInBytes(block.metadata.size)}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {block.metadata.transactionsCount}
              </StyledTableCell>
              <StyledTableCell align='left'>{block.block_identifier.hash}</StyledTableCell>
              <StyledTableCell align='right'>
                {getDisplayTimestamp(block.timestamp)}
              </StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton
                  component={Link}
                  to={getBlockDetailPageUrl(block.block_identifier.index)}
                >
                  <NavigateNext />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(BlocksList)
