export const unique = (arr, index) => {
  const array = arr.sort((a, b) => getDate(b.createdAt) - getDate(a.createdAt));

  const unique = array
    .map((e) => e[index])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
};

export const renderChat = (chatLists) => {
  return chatLists.filter(
    (ele, ind) =>
      ind === chatLists.findIndex((elem) => elem.user._id === ele.user._id),
  );
};

export const getChatFinalData = (array) => {
  return array.filter((item) => item.user.name != undefined);
};

export const getDate = (date) => {
  return new Date(date).getTime();
};

export const chatTime = (time) => {
  let date = new Date(time);
  const timeChat = `${date.getHours()}:${date.getMinutes()}`;

  return timeChat;
};

export const getDateOrder = (time, prefix = '-') => {
  let date = new Date(time);
  const dateOrder = `${date.getDate()}${prefix}${date.getMonth()}${prefix}${date.getFullYear()}`;

  return dateOrder;
};

export const getLastChat = (chats) => {
  return chats.sort((a, b) => getDate(b.createdAt) - getDate(a.createdAt));
};
