import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { amber, pink ,red,green} from '@material-ui/core/colors';

import { data as appointments } from './data';

const resources = [{
  fieldName: 'priorityId',
  title: 'Priority',
  instances: [
    { text: 'Ca sáng', id: 1, color: pink },
    { text: 'Ca tối', id: 2, color: amber },
  ],
}];
const groupOrientation = viewName => viewName.split(' ')[0];
const grouping = [{
  resourceName: 'priorityId',
}];

const Calendar = () => {
    const [data, setData] = React.useState(appointments);
    const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      }
      if (deleted !== undefined) {
        setData(data.filter(appointment => appointment.id !== deleted));
      }
    }, [setData, data]);
  
    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate="2018-05-30"
          />
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <GroupingState
            grouping={grouping}
            groupOrientation={groupOrientation}
          />
  
          <WeekView
            startDayHour={11}
            endDayHour={17}
            excludedDays={[0, 6]}
            cellDuration={60}
            name="Vertical Orientation"
          />
          <WeekView
            startDayHour={11}
            endDayHour={17}
            excludedDays={[0, 6]}
            name="Horizontal Orientation"
          />
  
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="priorityId"
          />
  
          <IntegratedGrouping />
          <IntegratedEditing />
          <AppointmentTooltip />
          <AppointmentForm />
  
          <GroupingPanel />
          <Toolbar />
          <ViewSwitcher />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
}

export default Calendar
