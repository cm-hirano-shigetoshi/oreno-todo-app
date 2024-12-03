export const executeCommand = async (command: string) => {
  const result = await window.electronAPI.executeCommand(command);
  return result;
};

export const getCalendarEvents = async (date: string) => {
  const result = await window.electronAPI.getCalendarEvents(date);
  return result;
};

export const openUrl = async (url: string) => {
  executeCommand(`open ${url}`);
};
