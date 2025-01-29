import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  DocumentTextIcon,
  IdentificationIcon,
  UserCircleIcon,
  BanknotesIcon,
  BriefcaseIcon,
  ClipboardDocumentIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

// Register the required components for ChartJS
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const CaseDetailModal = ({ caseItem, onClose }) => {
  if (!caseItem) return null;
  const [pastRecords, setPastRecords]=useState(null)
  const [familyBackground, setFamilyBackground]=useState(null)
  useEffect(()=>{
    const fetchdetails=async()=>{
      const bg=await axios.post("http://localhost:3000/prisoner/getDetailsOfPrisonerFamily", {prisonerId: caseItem.prisonerId})
      setFamilyBackground(bg.data.data)
      const past=await axios.post("http://localhost:3000/prisoner/getPastDetailsOfPrisoner", {prisonerId: caseItem.prisonerId})
      setPastRecords(past.data.data)      
      console.log(past.data.data)
    }
    fetchdetails()
  },[])
  // State for fine calculation and surety bonds
  const [fineAmount, setFineAmount] = useState(0);
  const [fineBreakdown, setFineBreakdown] = useState({
    crimeSeverity: 0,
    incomeBased: 0,
    previousFines: 0,
  });
  const [suretyAmount, setSuretyAmount] = useState(0);
  const [isSuretyCalculated, setIsSuretyCalculated] = useState(false);
  const [isFineCalculated, setIsFineCalculated] = useState(false);

  // Dummy data for surety bonds price and calculation
  const baseSuretyAmount = 100000; // Example base amount for surety bonds
  const suretyMultiplier = 1.5; // Example multiplier for surety bond calculation

  // Example factors for fine calculation
  const baseFine = 50000; // Base fine amount for severity of crime
  const incomePercentage = 0.1; // 10% of income as fine
  const previousFines = 20000; // Example amount of previous fines

  // Dummy data for caseItem
  const dummyCaseItem = {
    title: "Case #12345",
    details: {
      caseDetails:
        "The case involves a theft charge under section 378 of the IPC.",
      pastRecords: "The individual has previous convictions for petty theft.",
      familyBackground:
        "The individual comes from a financially unstable family.",
      income: 250000, // Dummy income in INR
    },
  };

  // Document links (for demonstration purposes)
  const documentLinks = {
    proofOfIncome: "https://example.com/proof_of_income.pdf",
    propertyPapers: "https://example.com/property_papers.pdf",
    previousCriminalRecords:
      "https://example.com/previous_criminal_records.pdf",
    characterReferences: "https://example.com/character_references.pdf",
    suretyIdentificationProof:
      "https://example.com/surety_identification_proof.pdf",
    incomeTaxReturns: "https://example.com/income_tax_returns.pdf", // Added for fine calculation
    salarySlips: "https://example.com/salary_slips.pdf", // Added for fine calculation
    firDocuments: "https://example.com/fir_documents.pdf", // FIR Documents
    policeReport: "https://example.com/police_report.pdf", // Police Report
    courtOrders: "https://example.com/court_orders.pdf", // Court Orders
    bailDocuments: "https://example.com/bail_documents.pdf", // Bail Documents
    chargeSheet: "https://example.com/charge_sheet.pdf", // Charge Sheet
    witnessStatements: "https://example.com/witness_statements.pdf", // Witness Statements
  };

  // Calculate fine
  const calculateFine = () => {
    const income = dummyCaseItem.details.income;

    if (!income || isNaN(income)) {
      console.error("Invalid or missing income in caseItem details.");
      return;
    }

    const crimeSeverityFine = baseFine; // Base fine based on crime severity
    const incomeBasedFine = income * incomePercentage; // 10% of income
    const totalFine = crimeSeverityFine + incomeBasedFine + previousFines;

    setFineBreakdown({
      crimeSeverity: crimeSeverityFine,
      incomeBased: incomeBasedFine,
      previousFines,
    });
    setFineAmount(totalFine);

    // Toggle visibility
    setIsFineCalculated(!isFineCalculated);
  };

  // Calculate surety bonds
  const calculateSuretyAmount = () => {
    setSuretyAmount(baseSuretyAmount * suretyMultiplier);
    setIsSuretyCalculated(!isSuretyCalculated); // Toggle surety calculation visibility
  };

  // Chart data for risk analysis (Pie Chart)
  const riskChartData = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [30, 50, 20], // Example data
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        borderColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  const riskChartOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += Number(data);
          });
          let percentage = ((value / sum) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  // Dummy data for case timeline
  const dummyData = {
    hearingsCount: 12, // Example number of hearings
    timeInJail: 24, // Example time in jail in months
    originalPunishment: 36, // Example original punishment in months
  };

  // Chart data for case timeline (Bar Chart) specific to the case
  const caseTimelineData = {
    labels: ["Hearings", "Time in Jail", "Original Punishment"],
    datasets: [
      {
        label: "Case Details",
        data: [
          dummyData.hearingsCount,
          dummyData.timeInJail,
          dummyData.originalPunishment,
        ], // Dummy data
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const caseTimelineOptions = {
    plugins: {
      datalabels: {
        formatter: (value) => {
          return `${value}`;
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Timeline Aspects",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };