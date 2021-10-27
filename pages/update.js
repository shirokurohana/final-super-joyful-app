// All credits to Vets Who Code: https://dev.to/vetswhocode/build-a-crud-firestore-app-in-react-gatsby-with-hooks-4ig9#update-function

const updateItem = ({ currentItem }, updatedItem) => {
  console.log(
    "Praise the Lord!",
    updatedItem,
    currentItem.id
  );
  //When the Update button is pressed, it turns off editing
  setEditing(false)
  firebase
    .firestore()
    .collection("items")
    .doc(currentItem.id)
    .update(updatedItem);
};

<UpdateItem
  setEditing={setEditing}
  currentItem={currentItem}
  updateItem={updateItem}
/>;
