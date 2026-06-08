import { useState } from 'react';
import ReactDom from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import Overlay from '../reusables/Overlay';
import Input from '../inputs/Input';
import Button from '../buttons/Button';
import useShow from '../../hooks/useShow';

export default function AddItem({ 
  onClose, 
  label, 
  inputs,
  setData,
  addFunc,
  sector = false,
}) {
  const [show, handleClose] = useShow({initialValue: false, onClose: onClose});
  const rows = []
  for (let i = 0; i < Object.entries(inputs).length; i += 2) {
    rows.push(Object.entries(inputs).slice(i, i + 2));
  }

  return ReactDom.createPortal(
    <>
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
          pt-8
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
              <FaPlus />
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

          <div className={`
            ${sector ? 'w-[300px] pb-4' : 'w-[600px]'} 
            mt-3
          `}>
            {rows.map((row, index) => (
              <div 
                key={index} 
                className={`
                  flex 
                  ${sector && 'flex-col'}
                  gap-1 
                  w-full 
                  mb-2 
                  justify-between
                `}
              >
                {row.map(([key, value]) => (
                  <span key={key} className="w-1/2 md:w-full">
                    {value}
                  </span>
                ))}
              </div>
            ))}
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
                const data = await addFunc();
                setData(data);
              }}
            /> 
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}