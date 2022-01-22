function getAppointmentsForDay (state, day) {
  const returnArr = [];
  const stateDay = state.days.filter(potentialDay => potentialDay.name === day);

  if (stateDay.length !== 1) {return []};

  const appointments = stateDay[0].appointments;

  for (const [key, value] of Object.entries(state.appointments)) {
    if (appointments.includes(value.id)) {
      returnArr.push(value)
    }
  }
  return returnArr;
};


function getInterview (state, interview) {
  if (!interview) {return null};
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return { ...interview, interviewer }
}



export { getAppointmentsForDay, getInterview }