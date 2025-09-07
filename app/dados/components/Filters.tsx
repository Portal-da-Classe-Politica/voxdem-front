'use client';

import { Button, Select } from "@/components";
import { useState } from "react";

export default function Filters() {
    const [selectedSurvey, setSelectedSurvey] = useState('');
    const [selectedVariable, setSelectedVariable] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

    return (
        <div className="w-80 bg-gray-100 rounded-lg w-130">
            <div className="p-6">
                <div className="mb-6">
                    <div className="w-12 h-12 bg-[#3D58F5] rounded flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-lg">VD</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pesquisa survey
                    </label>
                    <Select
                        value={selectedSurvey}
                        onChange={setSelectedSurvey}
                        placeholder="Selecione uma opção"
                    >
                        <option value="survey1">Survey Nacional 2023</option>
                        <option value="survey2">Survey Regional 2023</option>
                        <option value="survey3">Survey Municipal 2022</option>
                    </Select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Variável a ser analisada
                    </label>
                    <Select
                        value={selectedVariable}
                        onChange={setSelectedVariable}
                        placeholder="Selecione uma opção"
                    >
                        <option value="satisfaction">Satisfação Democrática</option>
                        <option value="tolerance">Tolerância Política</option>
                        <option value="behavior">Comportamento Eleitoral</option>
                        <option value="culture">Cultura Política</option>
                        <option value="legitimacy">Legitimidade Institucional</option>
                    </Select>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtros (Opcionais)
                    </label>
                    <Select
                        value={selectedFilter}
                        onChange={setSelectedFilter}
                        placeholder="Selecione uma opção"
                    >
                        <option value="age">Faixa Etária</option>
                        <option value="education">Escolaridade</option>
                        <option value="income">Renda</option>
                        <option value="region">Região</option>
                        <option value="gender">Gênero</option>
                    </Select>
                </div>

                <Button
                    variant="blue"
                    className="w-full"
                    onClick={() => {
                        console.log('Aplicando filtros:', { selectedSurvey, selectedVariable, selectedFilter });
                    }}
                >
                    Aplicar
                </Button>
            </div>
        </div>
    )
}