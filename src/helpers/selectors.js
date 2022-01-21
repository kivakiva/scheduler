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

const state = {
  interviewers: {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
}
}

function getInterview (state, interview) {
  if (!interview) {return null};
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return { ...interview, interviewer }
}



export { getAppointmentsForDay, getInterview }