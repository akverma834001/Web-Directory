export interface QueryFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  honeypot?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export async function submitContactQuery(data: QueryFormData): Promise<ApiResponse> {
  // Client-side quick checks
  if (!data.name.trim()) {
    return { success: false, message: "Please enter your name." };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (!data.subject.trim()) {
    return { success: false, message: "Please enter a subject for your query." };
  }
  if (data.message.trim().length < 10) {
    return { success: false, message: "Please provide a message of at least 10 characters." };
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Something went wrong. Please try again or email me directly at akverma834001@gmail.com.",
      };
    }

    return {
      success: true,
      message: result.message || "Message sent successfully. Thanks for reaching out.",
    };
  } catch (error) {
    console.error("Submission error:", error);
    return {
      success: false,
      message: "Network error. Please try again or email me directly at akverma834001@gmail.com.",
    };
  }
}
