// src/lawyerComponents/components/CasesPage.jsx
import React, { useEffect, useState } from 'react';
import CaseDetailModal from './CaseDetailModal';
import axios from 'axios'

const CasesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cases, setCases]=useState(null)
  useEffect(()=>{
    const fetchCases=async()=>{
      const token=localStorage.getItem('id');
      const response=await axios.post("http://localhost:3000/judge/getJudgeCases", {judgeId: token})
      setCases(response.data.data)
    }
    fetchCases()
  },[])
  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCase(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Case Overview</h2>
      <ul className="w-full max-w-3xl">
        {cases && cases.map((caseItem) => (
          <li
            key={caseItem.caseId}
            className="p-4 bg-white shadow mb-4 rounded-lg cursor-pointer"
          ></li>