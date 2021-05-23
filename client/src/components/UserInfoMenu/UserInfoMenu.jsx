import React,{useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Divider,Typography,Button,Paper} from '@material-ui/core';


import InternshipCard from '../InternshipCard/InternshipCard'
import ProjectCard from '../ProjectCard/ProjectCard'
import ProjectCardDialog from '../ProjectCardDialog/ProjectCardDialog'
import InternshipCardDialog from '../InternshipCardDialog/InternshipCardDialog'


import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const classes = useStyles();
  const[dummyproject,setDummyproject]=useState({
    title:'',
    description:'',
    startDate:Date.now(),
    endDate:Date.now()
  })
  const[dummyinternship,setDummyinternship]=useState({
    companyName:'',
    description:'',
    designation:'',
    startDate:Date.now(),
    endDate:Date.now()
  })
  const { value, index,editflag,data,changeflag,setChangeflag} = props;
  const[projectOpen,setProjectOpen]=useState(false)

    const handleProjectDialogOpen = () => {
      setProjectOpen(true);
  };
  const handleProjectDialogClose = () => {
    setProjectOpen(false);
  }; 
  const[internOpen,setInternOpen]=useState(false)

    const handleInternDialogOpen = () => {
      setInternOpen(true);
  };
  const handleInternDialogClose = () => {
    setInternOpen(false);
  }; 
  console.log(data);
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
              {editflag && (
                  <Paper elevation={0}  className={classes.root}>
                    <Button  onClick={handleProjectDialogOpen} variant="contained" color="primary">Add Project</Button>
     
                    </Paper>
                )}
                <Box >
                {data.projects && data.projects.length!==0 && data.projects.map((project,index)=>(
                  <><ProjectCard key={index} editflag={editflag} changeflag={changeflag} setChangeflag={setChangeflag} data={project} />
                  <Divider /></>
                  ))}
                  

                </Box>
      
              </Box>
            )}
            <ProjectCardDialog open={projectOpen} onClose={handleProjectDialogClose} changeflag={changeflag} setChangeflag={setChangeflag} data={dummyproject}/>

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
            {editflag && (
                  <Paper elevation={0}  className={classes.root}>
                    <Button  onClick={handleInternDialogOpen} variant="contained" color="primary">Add Internship</Button>
     
                    </Paper>
                )}
              <Box>
              {data.internships && data.internships.length!==0 && data.internships.map((internship,index)=>(
                  <><InternshipCard key={index} editflag={editflag} changeflag={changeflag} setChangeflag={setChangeflag} data={internship} />
                  <Divider /></>
                  ))}
                

              </Box>
    
            </Box>

          )}
          <InternshipCardDialog open={internOpen} onClose={handleInternDialogClose} changeflag={changeflag} setChangeflag={setChangeflag} data={dummyinternship}/>

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

          case 3:
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
                      All posts
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

export default function UserInfoMenu({editflag,data,changeflag,setChangeflag}) {
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
          <Tab label="Posts"  />

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} changeflag={changeflag} setChangeflag={setChangeflag} data={data} editflag={editflag} dir={theme.direction} />
        <TabPanel value={value} index={1} changeflag={changeflag} setChangeflag={setChangeflag} data={data} editflag={editflag} dir={theme.direction} />
        <TabPanel value={value} index={2}  changeflag={changeflag} setChangeflag={setChangeflag} editflag={editflag} dir={theme.direction}/>
        <TabPanel value={value} index={3}  changeflag={changeflag} setChangeflag={setChangeflag} editflag={editflag} dir={theme.direction}/>

          
      </SwipeableViews>
    </div>
  );
}
