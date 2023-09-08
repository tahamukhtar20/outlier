import React, {useState} from "react";
import {GradientRoundedButton} from "./SharedComponents.jsx";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit} className="container mx-auto max-w-3xl">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)]"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)]"
                            placeholder="johndoe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)]"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <GradientRoundedButton
                            type="submit"
                            className="w-fit p-3 px-8"
                        >
                            Send
                        </GradientRoundedButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
