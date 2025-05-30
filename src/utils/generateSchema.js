async function generateSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Nelaton: Self-Catheterization",
        "description": "Nelaton — Your Smart Assistant for Self-Catheterization! Track timing, catheter stock, fluid balance monitoring and over 10 key parameters to support your bladder health.",
        "operatingSystem": [
            "iOS",
            "Android"
        ],
        "applicationCategory": "Medical",
        "softwareVersion": "1.0.0",
        "downloadUrl": [
            "https://apps.apple.com/us/app/nelaton-self-catheterization/id6741067645",
            "https://play.google.com/store/apps/details?id=com.ulibkin.nelaton"
        ],
        "keywords": [
            "nelaton",
            "self-catheterization",
            "intermittent catheterization",
            "urinary intermittent catheter",
            "neurogenic bladder",
            "periodic catheterization",
            "multiple sclerosis",
            "chronic urinary retention",
            "hydrophilic catheter",
            "self-catheterization diary",
            "intermittent cathing",
            "nelaton app"
        ],
        "creator": {
            "@type": "Organization",
            "name": "Ulibkin OÜ",
            "url": "https://nelaton.app",
            "logo": "https://nelaton.app/_next/static/media/nelatonLogoSvg.990811ff.svg",
            "sameAs": [
            "https://www.instagram.com/nelaton.app?igsh=MXY1ZmQxem95dXB6cw=="
            ]
        },
        "hasPart": {
            "@type": "SoftwareApplication",
            "name": "Nelaton",
            "operatingSystem": "iOS, Android",
            "applicationCategory": "MedicalApplication",
            "applicationSubCategory": "Urinary Health Management",
            "description": "Nelaton is a medical app that supports people who perform intermittent self-catheterisation. It offers smart tracking of catheterisation intervals, catheter usage, fluid balance, and personalized reminders.",
            "featureList": [
            "Smart interval timer for precise adherence to your doctor’s recommendations.",
            "Catheter tracking: always know how many are left & when to restock.",
            "Support for fluid balance monitoring.",
            "Convenient self-catheterization journal (urination diary).",
            "Personalized reminders.",
            "Compatible with all urinary catheters for self-catheterization."
            ]
        },
        "mainEntityOfPage": {
            "@type": "FAQPage",
            "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the timer on the main screen work?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "The timer counts down to the next catheterization. You need to catheterize before the timer runs out to stick to the schedule set by your doctor. If you miss the scheduled catheterization, the timer will show the time that has passed since the last one. After each catheterization, go into the app and press the 'Done' button to start the countdown for the next catheterization."
                }
            },
            {
                "@type": "Question",
                "name": "How often do I need to catheterize?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "The frequency of catheterization is determined by your doctor, based on your condition. It's also important to note that the frequency may change. We help you easily track your urination habits, which helps your doctor adjust the interval between catheterizations as needed. It's recommended to perform self-catheterization regularly throughout the day, depending on the volume of fluids you consume and your doctor's recommendations. You may need to catheterize every 4-6 hours to ensure that the urine volume in the bladder does not exceed 400 ml. If you do not catheterize frequently enough and your bladder becomes overfilled, the risk of urinary tract infections and leakage increases. Prolonged bladder stretching can cause serious damage to the kidneys."
                }
            },
            {
                "@type": "Question",
                "name": "How much water should I drink?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Adults should drink at least 1.5 liters of water a day. This is just a recommendation, and you should consult your doctor to know how much water is right for you. Remember, water is the best drink. It's recommended to avoid caffeinated drinks, as caffeine irritates the bladder. Drinking enough water helps flush the urinary system. The Nelaton app helps you track your hydration levels. You can log your water intake on the main screen using the '+Drank' button, and the 'Water Balance' screen lets you monitor your fluid intake and urine output."
                }
            },
            {
                "@type": "Question",
                "name": "How can I prevent urinary tract infections?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Maintain hygiene, regularly and completely empty your bladder, and drink enough fluids. We recommend filling out our catheterization satisfaction survey at least once a month and sharing it with your doctor."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to catheterize at night?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Usually, it's enough to catheterize before bed and right after waking up, then continue at intervals throughout the day. However, your doctor will advise you on what's best for you. The app helps you follow any schedule and interval of catheterization. You can set up a nighttime catheterization, follow the interval during the night, or even disable nighttime catheterization by enabling sleep mode. It all depends on your doctor's advice, and our app is ready to help you follow any schedule."
                }
            },
            {
                "@type": "Question",
                "name": "How do I track catheter usage?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "The app automatically tracks catheter usage. You need to specify how many catheters you have and whether you use additional supplies during catheterization (such as aseptic wipes, urine bags, gloves, etc.). This will help you keep track of how many catheters and necessary supplies you have and replenish them in time. Every time you press the 'Done' button, the app will deduct the appropriate amount of supplies. When you purchase catheters and other supplies, don't forget to update the quantity in the app."
                }
            },
            {
                "@type": "Question",
                "name": "What should I do when traveling abroad?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Take enough catheters with you and carry a medical certificate confirming their necessity. This certificate will help you pass security checks at airports or other events with heightened security measures. On the 'Catheter Usage' tab, you can calculate how many catheters you need to take with you based on your average consumption."
                }
            },
            {
                "@type": "Question",
                "name": "What should I do if a feature is missing from the app?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Write to us using the form on this page. Describe the situation you encountered and what functionality you feel is missing in the Nelaton app. We will consider your suggestions in future updates."
                }
            }
            ]
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ulibkin OÜ"
        },
        "screenshot": "https://nelaton.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FiPhoneScreenShot1.81e3d246.webp&w=1080&q=75",
        "datePublished": "2025",
        "about": [
            {
            "@type": "MedicalCondition",
            "name": "Neurogenic bladder"
            },
            {
            "@type": "MedicalCondition",
            "name": "Multiple sclerosis"
            },
            {
            "@type": "MedicalCondition",
            "name": "Spinal cord injury"
            },
            {
            "@type": "MedicalCondition",
            "name": "Chronic urinary retention"
            }
        ]
    }
}
export {
    generateSchema
};