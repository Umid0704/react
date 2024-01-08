import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Users() {
  const [check, setCheck] = useState(false);
  const [items, setItems] = useState([
    { id: 1, title: "Open", item: [{ name: "task1" }] },
    { id: 2, title: "Pending", item: [{ name: "task2" }] },
    { id: 3, title: "Iproge", item: [{ name: "task3" }] },
    { id: 4, title: "Progres", item: [{ name: "task4" }] },
  ]);

  const [select, setSelect] = useState("");
  const [name, setAddName] = useState("");
  const [ediItems, setEditItems] = useState("");
  const [modalEdit, setEdit] = useState(false);
  const [editTitel, setEditTitel] = useState("");
  const edit = (id, i, e, v) => {
    setEditTitel(v.name);
    setEditItems(i);
    setEdit(id);
    setModal(true);
    setCheck(true);
  };

  // delete function
  const deleteitem = (id, i, e) => {
    e.item.splice(id, 1);
    setItems([...items]);
  };
  // add function
  const [modal, setModal] = useState(false);
  const addUser = (e) => {
    setModal(false);
    e.preventDefault();

    if (check == true) {
      setCheck(false);
      let num = select - 1;
      setAddName(editTitel);
      let payload = { name };
      items.forEach((v, i) => {
        if (i == ediItems) {
          items[ediItems].item.splice(modalEdit, 1);
          setItems([...items]);
        }
        if (num == i) {
          v.item.push({ ...payload });
          setItems([...items]);
        }
      });

      console.log(editTitel);
    } else {
      setEditTitel("");
      let num = select - 1;
      let payload = { name };
      items.forEach((v, i) => {
        if (i == num) {
          v.item.push(payload);
          setItems([...items]);
        }
      });
    }
  };

  return (
    <div className="flex justify-center  mt-4">
      {items.map((e, i) => {
        return (
          <div key={i} className="border  w-[230px]">
            <h2 className="text-[22px] text-center">{e.title}</h2>
            <div>
              {e.item.map((v, id) => {
                return (
                  <div key={id} className="flex justify-between  border p-3">
                    <p className="text-[22px]">{v.name}</p>
                    <div>
                      <button onClick={() => edit(id, i, e, v)}  className="border px-[15px] py-[5px] bg-blue-400 rounded-3">edit</button>
                      <button className="border px-[15px] py-[5px] rounded-3 bg-red-400" onClick={()=>deleteitem(id, i, e)}>delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <button  onClick={() => setModal(true)}  className="border px-[15px] py-[5px] bg-green-400 text-white rounded-3">Add User</button>
            </div>
          </div>
        );
      })}
      {/* Add user */}
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <form onSubmit={addUser} id="form">
          <ModalHeader>
            <h1>Add User</h1>
          </ModalHeader>
          <ModalBody>
            <input
              defaultValue={editTitel}
              placeholder="Add name"
              type="text"
              onChange={(e) => setAddName(e.target.value)}
            />
            <select onChange={(e)=>setSelect(e.target.value)}>
              <option value="" hidden>select</option>
              {items.map((v, i) => (
                <option key={i} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </ModalBody>
          <ModalFooter>
            <button className="px-[10px] py-[6px] bg-green-400 rounded-3 text-white" type="submit" form="form"> Add user </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
