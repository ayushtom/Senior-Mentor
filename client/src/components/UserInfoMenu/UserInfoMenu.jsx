import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Divider,Typography} from '@material-ui/core';


import InternshipCard from '../InternshipCard/InternshipCard'
import ProjectCard from '../ProjectCard/ProjectCard'
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { value, index,editflag} = props;
  switch (index) {
    case 0:
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
          >
            {value === index && (
              <Box>
                <Box >
                  <ProjectCard editflag={editflag}/>
                  <Divider />
                  

                </Box>
      
              </Box>
            )}
          </div>
        );
    case 1:
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
        >
          {value === index && (
            <Box>
              <Box>
                <InternshipCard editflag={editflag}/>
                <Divider />
                

              </Box>
    
            </Box>
          )}
        </div>
      );
      
      

        case 2:

          return (
            <div
              role="tabpanel"
              hidden={value !== index}
              id={`full-width-tabpanel-${index}`}
              aria-labelledby={`full-width-tab-${index}`}
            >
              {value === index && (
                <Box>
                  <Box mt={5}>
                    Resume
                  </Box>
        
                </Box>
              )}
            </div>
          );

  
    default:
      break;
  }
  
}



TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserInfoMenu({editflag}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          aria-label="full width tabs example"
        >
          <Tab label="Projects"  />
          <Tab label="Internships"  />
          <Tab label="Resume"  />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} editflag={editflag} dir={theme.direction} />
        <TabPanel value={value} index={1} editflag={editflag} dir={theme.direction} />
        <TabPanel value={value} index={2} editflag={editflag} dir={theme.direction}/>
          
      </SwipeableViews>
    </div>
  );
}
