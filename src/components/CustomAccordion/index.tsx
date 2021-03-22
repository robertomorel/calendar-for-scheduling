import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { FiDelete, FiBookOpen } from 'react-icons/fi'

import { formatToLocaleDateString } from '../../utils/date'
import { actionDeleteAReminder, useActionDispatch } from '../../store'
import { actionActivateReminderUpdate } from '../../store/slices'

import { Container, Signal, Content, ContentLeft, ContentRight } from './styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

interface AccordionComponentProps {
  uuid: string
  title: string
  description: string
  color: string
  datetime: Date
  city: string
}

const CustomAccordion: React.FC<AccordionComponentProps> = ({ uuid, title, description, color, datetime, city }) => {
  const dispatch = useActionDispatch()
  const classes = useStyles()

  const handleDeleteReminder = useCallback(
    async (id: string) => {
      await dispatch(actionDeleteAReminder(id))
    },
    [dispatch],
  )

  const handleUpdateReminder = useCallback(
    async (id: string) => {
      await dispatch(actionActivateReminderUpdate(id))
    },
    [dispatch],
  )

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label={<strong>{title}</strong>}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            <Container>
              <Signal color={color} />
              <Content>
                <ContentLeft>
                  <div>
                    <span>Date/Time: {formatToLocaleDateString(new Date(datetime))}</span>
                  </div>
                  <div>
                    <span>Task: {description}</span>
                  </div>
                  <div>
                    <span>Location: {city}</span>
                  </div>
                </ContentLeft>
                <ContentRight>
                  <div>
                    <FiBookOpen size={20} onClick={() => handleUpdateReminder(uuid)} />
                  </div>
                  <div>
                    <FiDelete size={20} onClick={() => handleDeleteReminder(uuid)} />
                  </div>
                </ContentRight>
              </Content>
            </Container>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default CustomAccordion
