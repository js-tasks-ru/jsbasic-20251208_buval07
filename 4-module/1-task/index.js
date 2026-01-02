function makeFriendsList(friends) {
  // ваш код...
  const ul = document.createElement("UL");

  friends.forEach((friend) => {
    const li = document.createElement("LI");
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  });

  return ul;
}
