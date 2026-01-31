//after quest starts these are the questions
import type { Question, QuestId } from "../game/types";

export const QUESTIONS: Record<QuestId, Question[]> = {
  quest1: [
    {
      id: "q1",
      question: "True or False: There is no point in starting a savings account as a teen.",

      options: [
        "True",
        "False"
      ],
      answer: 0
    },
    {
      id: "q2",
      question: "Fill in the blank: A ________ account typically has a lower transaction fee, making it great for everyday use.",
      options: [
        "Savings",
        "Checking"
        
      ],
      answer: 1
    },
    
    {
      id: "q3",
      question: "You have the choice between two banks. Celestial Corp offers 2.25% annual interest, Influx Inc offers 0.5%. Who do you go with?",
      options: [
        "Influx Inc - 0.5% interest",
        "Celestial Corp - 2.25% interest",
        "Either one is fine, interest rates don't matter",
        "Don't use banks"
      ],
      answer: 1,
      explanation: "Celestial Corp has the better rate. A higher interest rate means you will earn more money."
    },

    {
      
      id: "q4",
      question: "Which card directly uses money from your checking account?",
      options: [
        "Credit Card",
        "Gift Card",
        "Debit Card",
        "All of the above"
      ],
      answer: 2
    },
    {
      id: "q5",
      question: "Oh no! You missed a credit card payment deadline. What happens now?",
      options: [  
      "Nothing, it's fine everyone misses deadlines sometimes",
      "You may be charged interest on top of what you owe and it can hurt your credit score",
      "Just pay next month, it will all even out",
      "Your credit card company will forgive you this one time"
      ],
      answer: 1
      
    },
    
    {
      id: "q6",
      question: "True or False: With a debit card, you can spend more money than you have in your checking account.",
      options: [
        "True",
        "False"
      ],
      answer: 1 
    }
  ],
  quest2: [
    {
      id: "q1",
      question: "Ella wants to buy a new bike, but she doesn't have enough. What should she do?",
      options: [
        "Ella should take out a Payday loan, borrow $50, pay back $150",
        "Ella should budget and save up for the bike over time",
        "Ella should steal the money from her mom's purse",
        "Ella shouldn't buy the bike at all"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "True or False: You have to pay back grants in full including any interest fees.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "Fill in the blank: _______ is the amount of time that you have to repay a loan.",
      options: [
        "Loan rate",
        "Interest rate",
        "Loan term",
        "Interest term"
      ],
      answer: 2
    },
    {
      id: "q4",
      question: "True or False: Payday loans are low risk and a good way to borrow money for small purchases.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q5",
      question: "True or False: You should never take out a loan, it is too risky.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q6",
      question: "Carly needs a loan of $3000 and is deciding between two loans. Celestial Corp is offering a loan with a principal of $5000 and an interest rate of 3.95%. Influx Inc is offering a loan with a principal of $7500 and an interest rate of 6%. Which loan should Carly take?",
      options: [
        "Carly should take the Celestial Corp loan",
        "Carly should take the Influx Inc loan",
        "Carly should take both loans"
      ],
      answer: 0
    },
{
      id: "q7",
      question: "Fill in the blank: _______ allow you to borrow a fixed amount of money and pay it back over a certain period.",
      options: [
        "Student Loans",
        "Mortgage",
        "Personal Loans",
        "Payday Loans"
      ],
      answer: 2
    },
    {
      id: "q8",
      question: "Why are student loans generally considered lower risk than some other loans?",
      options: [
        "They usually have lower interest rates and flexible repayment options",
        "They lend more money on average",
        "They never have to be paid back",
        "They aren't considered lower risk, they are one of the riskest loans"
      ],
      answer: 0
    },
    {
      id: "q9",
      question: "Why do banks use to decide what kind of loan you have?",
      options: [
        "Credit Score",
        "Credit Limit",
        "Interest Rate",
        "All of the above"
      ],
      answer: 0
    },
 ],
  quest3: [
    {
      id: "q1",
      question: "Your aunt gives you $25. If you invest it, what happens?",
      options: [
        "It stays $25 forever",
        "It grows into more money over time",
        "You lose it all",
        "Nothing happens"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "What is compound interest?",
      options: [
        "A bank fee",
        "Your money makes money, then THAT money makes more money",
        "A type of loan",
        "Boring adult stuff"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "You're 15. When should you start saving/investing?",
      options: [
        "Wait until you're 30",
        "Wait until you're rich",
        "Start NOW - even small amounts grow big over time",
        "Never, just spend everything"
      ],
      answer: 2
    }
  ],
  quest4: [
    {
      id: "q1",
      question: "FINAL CHALLENGE: What's the smartest money move for your future?",
      options: [
        "Spend everything, save nothing",
        "Save some, invest some, avoid bad debt, build credit",
        "Take lots of loans and figure it out later",
        "Keep cash under your mattress"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "FINAL CHALLENGE: You've learned about banking, budgeting, and investing. What's the best financial strategy?",
      options: [
        "Only save money, never invest",
        "Balance saving, investing, and smart spending",
        "Spend everything you earn",
        "Only use credit cards for everything"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "FINAL CHALLENGE: Which combination helps you build wealth over time?",
      options: [
        "High-interest debt and no savings",
        "Good bank account, smart budgeting, early investing",
        "Spending all your money immediately",
        "Avoiding banks completely"
      ],
      answer: 1
    }
  ]
};
