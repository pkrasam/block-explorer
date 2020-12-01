import React from 'react'
import { useTranslation } from 'react-i18next'

import TransactionsContainer from '../TransactionsContainer/TransactionsContainer'

import Alert from '../../components/Alert/Alert'
import BoxWrapper from '../../components/BoxWrapper/BoxWrapper'
import Breadcrumb, { PillType } from '../../components/Breadcrumb/Breadcrumb'
import InformationPanel from '../../components/InformationPanel/InformationPanel'
import Meta from '../../components/Meta/Meta'

import { ApiUrls } from '../../services/servicesUrls'
import useGetService from '../../services/useGetService'
import { ServiceState } from '../../types/Service'
import Block, { formatBlockFromJson } from '../../types/Block'

import { getBlockDetailPageUrl } from '../../utils/routes'
import { RoutePath } from '../../routes/routePath'
import { getDisplaySizeInBytes } from '../../utils/size'

const BlockDetailPage = () => {
  const { t } = useTranslation()
  const service = useGetService<Block>(ApiUrls.BLOCK_DETAIL_PAGE, {}, formatBlockFromJson)

  const blockData = service.status === ServiceState.LOADED && service.payload.result

  const metaVariables = {
    id: blockData ? `${blockData.height}` : '',
    hash: blockData ? blockData.hash : '',
  }

  return (
    <>
      {blockData && <Meta path={RoutePath.BlockDetailPage} variables={metaVariables} />}

      {blockData && (
        <Breadcrumb
          paths={[
            {
              title: t('app.components.breadcrumb.blocks'),
              to: RoutePath.Explorer,
              type: PillType.Route,
            },
            {
              title: blockData.height,
              to: getBlockDetailPageUrl(blockData.height),
              type: PillType.Block,
            },
            {
              title: blockData.hash,
              type: PillType.Block,
            },
          ]}
        />
      )}

      <BoxWrapper
        marginBottom={2}
        isLoading={service.status === ServiceState.LOADING}
        title={t('app.blockDetailPage.information.title')}
      >
        {service.status === ServiceState.ERROR && (
          <Alert
            title={t('app.blockDetailPage.information.error.title')}
            description={t('app.blockDetailPage.information.error.description')}
          />
        )}
        <div>
          {blockData && (
            <>
              <InformationPanel
                height={blockData.height}
                size={getDisplaySizeInBytes(blockData.size)}
                transactions={blockData.transactions}
                difficulty={blockData.difficulty}
                timestamp={blockData.timestamp}
              />
            </>
          )}
        </div>
      </BoxWrapper>

      {blockData && <TransactionsContainer hash={blockData.hash} />}
    </>
  )
}

export default BlockDetailPage
