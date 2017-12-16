
module.exports.update = {
    // answersUrl: 'https://raw.githubusercontent.com/GladysProject/gladys-data/master/answers/',
    answersUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/answers/',
    eventsBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/events/',
    boxTypesBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/boxs/',
    modesBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/modes/',
    sentencesBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/sentences/v2/',
    actionTypeUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/actions/',
    categoryBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/categories/',
    skinBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/skin/skin.json',
    draggableEventsBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/draggable-events/',
    stateBaseUrl: 'https://raw.githubusercontent.com/CallbackFeverTeam/Gladys-Data-CBF/master/states/',
    getLastVersionUrl: 'https://developer.gladysproject.com/api/gladys/version',
    icon: 'fa fa-refresh',
    iconColor: 'bg-light-blue',
    link: '/dashboard/parameters',
    updateScript: process.env.UPDATE_SCRIPT_PATH || `${__dirname}/../rpi-update.sh`,
    checkUpdateInterval: process.env.CHECK_UPDATE_INTERVAL || 24*60*60*1000
};