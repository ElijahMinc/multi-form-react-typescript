import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
} from '@elastic/eui'
import React from 'react'

export interface IModal {
  onCloseModal: () => void
}

export const Modal: React.FC<IModal> = ({ onCloseModal, children }) => {
  return (
    <EuiModal maxWidth={700} onClose={onCloseModal} style={{ width: '60vw' }}>
      <EuiModalHeader style={{ justifyContent: 'center' }}>
        <EuiModalHeaderTitle>
          <h1>Users</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>{children}</EuiModalBody>
      <EuiSpacer />
      <EuiModalFooter>
        <EuiButton onClick={onCloseModal} fill>
          Close
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}
