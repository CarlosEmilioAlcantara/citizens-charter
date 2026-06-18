import ReactDom from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus, FaPen } from 'react-icons/fa';
import Overlay from '../reusables/Overlay';
import Input from '../inputs/Input';
import InputArea from '../inputs/InputArea';
import TransactionSelector from '../dropdowns/TransactionSelector';
import Selectbox from '../inputs/Selectbox';
import Button from '../buttons/Button';
import useShow from '../../hooks/useShow';
import useTransactionSelector from '../../hooks/useTransactionSelector';
import useSelectItems from '../../hooks/useSelectItems';
import { useEffect } from 'react';

export default function AddEditService({ 
  onClose, 
  label, 
  values,
  setValues,
  data,
  setData,
  addFunc,
  edit = false,
}) {
  const [show, handleClose] = useShow({initialValue: false, onClose: onClose});
  const {
    transactionSelector, toggleTransactionSelector
  } = useTransactionSelector();
  const {
    selected, 
    setSelected,
  } = useSelectItems();

  return ReactDom.createPortal(
    <div className={`
      fixed 
      top-0
      left-0
      flex
      justify-center
      items-center
      w-full
      h-full
      transition-opacity 
      duration-300 
      ${show ? 'opacity-100' : 'opacity-0'}
      z-50
    `}>
      <Overlay show={show} zIndex={40} toggle={handleClose} />
      <div className={`
        relative
        flex
        flex-col
        py-8
        p-4
        rounded-lg
        bg-background
        overflow-hidden
        z-50
      `}>
        <div className="
          absolute 
          top-0 
          left-0
          flex
          items-center
          justify-between
          min-w-full
          p-1 
          px-3
          border-b-2
          border-b-unfocused
          bg-popup-header
          text-accent 
          text-md
          font-bold
        ">
          <div className="flex items-center gap-2">
            {edit ? <FaPen /> : <FaPlus />}
            <span>{label}</span>
          </div>

          <FaXmark 
            size={24} 
            onClick={handleClose} 
            className="
              border-2
              border-transparent 
              rounded-xl 
              cursor-pointer 
              transition-all
              duration-600
              hover:bg-active 
              hover:border-active
            "
          />
        </div>

        <div className="flex flex-col gap-2 w-[800px] mt-3 pb-4">
          <Input 
            label={"Name"}
            warning={data?.name}
            type={"text"}
            placeholder={"Name..."}
            name={"name"}
            value={values.name}
            setValue={setValues}
            small={true}
          />
          <InputArea 
            label={"Deskripsyon"}
            warning={data?.description}
            type={"text"}
            placeholder={"Deskripsyon..."}
            name={"description"}
            value={values.description}
            setValue={setValues}
          />

          <div className="flex justify-between">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs">Uri ng Transaksyon</span>
              <TransactionSelector 
                label={
                  (values?.transaction === "simple") ?
                    "Simple" :
                  (values?.transaction === "complicated") ?
                    "Komplikado" :
                  (values?.transaction === "technical") &&
                    "Lubhang Teknikal"
                }
                isOpen={transactionSelector}
                toggle={toggleTransactionSelector}
                setValues={setValues}
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <span className="text-xs">Klasipikasyon</span>
              <Selectbox 
                items={[
                  "g2b", "g2c", "g2e", "g2g"
                ]}
                selected={selected}
                setSelected={setSelected}
                classification={true}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end items-center">
          <Button 
            label={"Kanselahin"} 
            remove={true}
            onClick={handleClose}
          /> 

          <Button 
            label={edit ? 'Iedit' : 'Idagdag'}
            onClick={async () => {
              const data = await addFunc();
              setData(data);
            }}
          /> 
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}