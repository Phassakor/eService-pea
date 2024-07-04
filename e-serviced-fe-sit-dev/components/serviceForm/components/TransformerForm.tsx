import React, { useState, useEffect } from 'react';
import { IElectricTransformers } from '@/Interfaces/formInterface';
import { InputForm, DropdownSelect } from '@/components/common';
import Image from "next/image";
import { IDropdown } from "@/Interfaces/interface";
import delete_forever from "@/app/asset/images/svg/delete_forever.svg";

interface TransformerFormProps {
    transformer: IElectricTransformers;
    brands: IDropdown[];
    phases: IDropdown[];
    types: IDropdown[];
    size: IDropdown[];
    voltage: IDropdown[];
    onUpdate: (id: number, name: string, value: any) => void;
    onRemove: () => void;
    numberOf?: number;
    isInvalid?: boolean;
}

const TransformerForm: React.FC<TransformerFormProps> = ({ transformer, size, voltage, brands, phases, types, onUpdate, onRemove, numberOf, isInvalid }) => {
    const [filteredTypes, setFilteredTypes] = useState<IDropdown[]>(types);

    useEffect(() => {
        const filterTypes = () => {
            onUpdate(transformer.id, "transformer_type", '');
            if (transformer.transformer_phase != '') {
                const newFilteredTypes = types.filter(type => type.sub_id === transformer.transformer_phase);
                setFilteredTypes([{ label: 'เลือกประเภท', value: '' }, ...newFilteredTypes]);
            } else {
                setFilteredTypes([{ label: 'เลือกประเภท', value: '' }]);
            }
        };
        filterTypes();
    }, [transformer.transformer_phase]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onUpdate(transformer.id, name, value);
    };
    return (
        <>
            <div className="flex justify-between mt-5">
                <div className="text-sub-title-card mb-5">
                    รายละเอียดหม้อแปลง {transformer.status === 'N' ? numberOf : ""}
                </div>
                {transformer.status === 'N' && (
                    <button onClick={onRemove}> <div className="flex">
                        <Image
                            src={delete_forever}
                            width={24}
                            height={24}
                            alt="Picture of the upload"
                        />
                        <div className="flex gap-2 items-center text-[var(--clr-indigo)] font-bold cursor-pointer pl-2">
                            <div
                                onClick={() => {
                                    onRemove();
                                }}
                            >
                                ลบหม้อแปลง
                            </div>
                        </div>
                    </div></button>
                )}


            </div>
            <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px] mb-[30px]">
                <DropdownSelect
                    label="ยี่ห้อ"
                    onChange={handleChange}
                    name="transformer_brand"
                    value={transformer.transformer_brand}
                    dataList={brands}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                <DropdownSelect
                    label="เฟส"
                    onChange={handleChange}
                    name="transformer_phase"
                    value={transformer.transformer_phase}
                    dataList={phases}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                <DropdownSelect
                    label="ประเภท"
                    disabled={transformer.transformer_phase == ''}
                    onChange={handleChange}
                    name="transformer_type"
                    value={transformer.transformer_type}
                    dataList={filteredTypes}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                <InputForm
                    label="Serial"
                    placeholder="Serial"
                    name="transformer_serial"
                    onChange={handleChange}
                    value={transformer.transformer_serial}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                <DropdownSelect
                    label="ขนาด"
                    placeholder="ขนาด"
                    name="transformer_size"
                    onChange={handleChange}
                    value={transformer.transformer_size}
                    dataList={size}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                <div className="grid md:grid-cols-2 gap-[1.75rem_1.875rem]">
                    <DropdownSelect
                    label="แรงดัน"
                    placeholder="แรงดัน"
                    name="transformer_voltage"
                    onChange={handleChange}
                    value={transformer.transformer_voltage}
                    dataList={voltage}
                    isRequired={true}
                    isInvalid={isInvalid}
                />
                {/* ics_id เช็คแล้วเปิด */}
                {transformer.transformer_voltage == 'อื่นๆ' ? (
                    <InputForm
                        label="อื่นๆ"
                        placeholder="อื่นๆ"
                        name="transformer_voltage"
                        onChange={handleChange}
                        value={transformer.transformer_voltage}
                        isRequired={true}
                        isInvalid={isInvalid}
                    />
                )
                    :
                    <>
                        <InputForm
                            disabled
                            label="อื่นๆ"
                            placeholder="อื่นๆ"
                            name="transformer_voltage"
                            onChange={handleChange}
                            value={""}
                        />
                    </>
                }
                </div>
                
            </div>
        </>
    );
};

export default TransformerForm;