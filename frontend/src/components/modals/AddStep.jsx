import ReactDom from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus, FaPen } from 'react-icons/fa';
import Overlay from '../reusables/Overlay';
import Input from '../inputs/Input';
import InputArea from '../inputs/InputArea';
import Button from '../buttons/Button';
import useShow from '../../hooks/useShow';
import OptionTicker from '../buttons/OptionTicker';
import TimeSelector from "../dropdowns/TimeSelector";
import DualListbox from "../inputs/DualListbox";
import useTimeSelector from '../../hooks/useTimeSelector';

export default function AddStep({
  onClose,
  label,
  addFunc,
  values,
  setValues,
  data,
  timeFormat,
  setTimeFormat,
  positions,
  setPositions,
  selectedPositions,
  setSelectedPositions,
}) {
  const [show, handleClose] = useShow({initialValue: false, onClose: onClose});
  const { timeSelector, toggleTimeSelector } = useTimeSelector();

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
            {<FaPlus />}
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
          <InputArea 
            label={"Name"}
            warning={data?.name}
            type={"text"}
            placeholder={"Name..."}
            name={"name"}
            value={values.name}
            setValue={setValues}
            small={true}
          />
          <div className="flex">
            <InputArea 
              label={"Aksyon"}
              warning={data?.action}
              type={"text"}
              placeholder={"Aksyon..."}
              name={"action"}
              value={values.action}
              setValue={setValues}
              small={true}
            />

            <OptionTicker 
              label={"Subaction"} 
              name={"is_subaction"}
              value={values.is_subaction}
              setValue={setValues}
            />
          </div>

          <Input 
            label={"Basehang Legal"}
            warning={data?.legal_basis}
            type={"number"}
            placeholder={"Basehang Legal..."}
            name={"legal_basis"}
            value={values.legal_basis}
            setValue={setValues}
            small={true}
          />

          <div className="flex justify-between gap-2">
            <Input 
              label={"Bayarin"}
              warning={data?.fee}
              type={"number"}
              placeholder={"Bayarin..."}
              name={"fee"}
              value={values.fee}
              setValue={setValues}
              small={true}
            />

            <TimeSelector 
              timeFormat={timeFormat}
              setTimeFormat={setTimeFormat}
              name={"processing_time"}
              value={values.processing_time}
              setValue={setValues}
              isOpen={timeSelector}
              toggle={toggleTimeSelector}
            />
          </div>

          <DualListbox 
            items={positions}
            setPositions={setPositions}
            selectedPositions={selectedPositions}
            setSelectedPositions={setSelectedPositions}
          />
        </div>

        <div className="flex gap-3 justify-end items-center">
          <Button 
            label={"Kanselahin"} 
            remove={true}
            onClick={handleClose}
          /> 

          <Button 
            label={"Idagdag"}
            onClick={async () => {
              await addFunc();
            }}
          /> 
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}