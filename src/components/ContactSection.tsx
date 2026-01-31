"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Controller, useForm} from "react-hook-form";
import { Button } from "@/components/ui/button"
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "next-turnstile";
import {useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MdAlternateEmail } from "react-icons/md";
import { FaGithub, FaItchIo } from "react-icons/fa";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    message: z.string().min(10, "Message must be at least 10 characters long"),
    turnstileToken: z.string().min(1, { message:"You must verify you're human" }),
});

export function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            website: "",
            message: "",
            turnstileToken: "",
        }
    });

    const [turnstileStatus, setTurnstileStatus] = useState<
        "success" | "error" | "expired" | "required"
    >("required");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setSuccessMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            form.reset();
            setTurnstileStatus("required");
            setSuccessMessage("Message sent successfully! I'll get back to you soon.");
        } catch (error) {
            console.error(error);
            setSuccessMessage("An error occurred while sending your message. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                    name="name"
                    control={form.control}
                    render={({field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-form-name">Full Name</FieldLabel>
                            <Input
                                {...field}
                                id="contact-form-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="John Doe"
                                autoComplete="name"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-form-email">Email Address</FieldLabel>
                            <Input
                                {...field}
                                id="contact-form-email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="email@example.com"
                                autoComplete="email"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Controller
                name="website"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-form-website">Website <span className="text-muted-foreground">(optional)</span></FieldLabel>
                        <Input
                            {...field}
                            id="contact-form-website"
                            type="url"
                            aria-invalid={fieldState.invalid}
                            placeholder="https://example.com"
                            autoComplete="url"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="message"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-form-message">Message</FieldLabel>
                        <Textarea
                            {...field}
                            id="contact-form-message"
                            aria-invalid={fieldState.invalid}
                            placeholder="Tell me about your project..."
                            rows={6}
                            className="resize-none"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="turnstileToken"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="turnstile">Verification</FieldLabel>
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                            retry="auto"
                            refreshExpired="auto"
                            onVerify={(token) => {
                                field.onChange(token);
                                setTurnstileStatus("success");
                            }}
                            onError={() => {
                                field.onChange("");
                                setTurnstileStatus("error");
                            }}
                            onExpire={() => {
                                field.onChange("");
                                setTurnstileStatus("expired");
                            }}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        {turnstileStatus === "error" && (
                            <FieldDescription className="text-destructive">
                                Verification failed. Please try again.
                            </FieldDescription>
                        )}
                    </Field>
                )}
            />

            <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? "Sending..." : "Send Message"}
            </Button>

            {successMessage && (
                <div className={`p-4 rounded-md ${successMessage.includes("error") ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"}`}>
                    <p className="text-sm font-medium">{successMessage}</p>
                </div>
            )}
        </form>
    )
}

export function ContactSection() {
    return (
        <section id="contact" className="w-full py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-5">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Let&apos;s build together
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        I&apos;m currently open to freelance web projects or game dev collaborations.
                        If you have a question or just want to say hi, my inbox is open.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Info */}
                    <div className="space-y-8">
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Current Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">📍</span>
                                    <span>United Kingdom (GMT+0)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">💻</span>
                                    <span>Building Next.js Websites</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-green-600 dark:text-green-400 font-medium">Available for work</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Get in touch</h3>
                            <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                                <a href="mailto:contact@oliverdave.dev" className="flex items-center gap-3">
                                    <MdAlternateEmail className="text-xl" />
                                    contact@oliverdave.dev
                                </a>
                            </Button>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" size="lg" asChild>
                                    <a href="https://github.com/pdaveoli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <FaGithub className="text-xl" />
                                        GitHub
                                    </a>
                                </Button>
                                <Button variant="outline" className="flex-1" size="lg" asChild>
                                    <a href="https://oliverdf1.itch.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <FaItchIo className="text-xl" />
                                        Itch.io
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Send me a message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
