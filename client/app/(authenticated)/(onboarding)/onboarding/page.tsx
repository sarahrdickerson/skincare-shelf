"use client";
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
      question: "What is your skin type?",
      options: [
        "Oily",
        "Dry",
        "Combination",
        "Normal",
      ],
      key: "skin_type", // We'll use this key for the backend JSON
    },
    {
      question: "Do you have sensitive skin?",
      options: ["Yes", "No"],
      key: "sensitive_skin", // Key for sensitive skin in the backend JSON
    },
    {
      question: "Do you experience acne?",
      options: ["Yes", "No", "Occasionally"],
      key: "acne", // Key for acne in the backend JSON
    },
    {
      question: "What is your primary skin concern?",
      options: [
        "Fine lines & wrinkles",
        "Dark spots",
        "Dryness",
        "Redness",
        "Acne",
        "Uneven skin tone",
      ],
      key: "primary_concern", // Key for primary concern in the backend JSON
    },
    {
      question: "What type of products do you prefer?",
      options: ["Natural", "Chemical", "No Preference"],
      key: "product_preference", // Key for product preference in the backend JSON
    },
  ];

const OnboardingPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const router = useRouter();

    const handleAnswer = (answer: string) => {
        setAnswers({
            ...answers,
            [questions[currentQuestion].key]: answer,
        });
        console.log("Current question", currentQuestion);

        setTimeout(() => {
            if ( currentQuestion < questions.length - 1 ) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                postAnswersToBackend();
            }
        }, 300);
    }

    const postAnswersToBackend = async () => {
        console.log(answers);
    }

    return (
        <div className='flex flex-col items-center p-8 space-y-6 max-w-lg mx-auto'>
            <div className='w-full'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion} // Key ensures the animation works when the question changes
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }} 
                        className="space-y-4"
                    >
                        <div className='text-xl mb-4 text-center'>
                            <p>{questions[currentQuestion]?.question}</p>
                        </div>

                        <div className='space-y-4'>
                            {questions[currentQuestion]?.options.map((option, index) => (
                                <Button
                                    key={index}
                                    className='w-full py-3 px-6'
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className='flex space-x-2 mt-6'>
                    {questions.map((_, index) => (
                        <span
                            key={index}
                            className={
                                `w-2 h-2 rounded-full transition-colors ${index === currentQuestion ? "bg-emerald-800" : "bg-gray-300"}
                                hover:bg-emerald-800/50 hover:cursor-pointer
                            `}
                            onClick={() => setCurrentQuestion(index)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default OnboardingPage