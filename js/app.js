// Contact Form Validation and Supabase Submission Code
const SUPABASE_URL = "https://sluonofupbvlgogpzney.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3wj2OiJv8Oyc0OgbF2NmzA_UNko4z1T";

// Initialize the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wait for the DOM content to completely parse before searching for elements
document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MAIN CONTACT FORM LOGIC
    // =========================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Blocks default HTML refresh behaviors

            // Fetch input strings safely ONLY when form is submitted
            const name = document.getElementById('name').value;
            const number = document.getElementById('number').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            try {
                // Post payload straight to your custom data table
                const { data, error } = await supabaseClient
                    .from('contact_submissions')
                    .insert([
                        { 
                            name: name, 
                            phone_number: number, 
                            email: email, 
                            subject: subject, 
                            message: message 
                        }
                    ]);

                if (error) throw error;

                // SUCCESS MODAL
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    background: 'rgba(0,0,0,0.8)',      
                    color: '#ffffff',            
                    confirmButtonColor: 'rgba(255, 0, 0)' 
                });
                
                contactForm.reset(); // Safely clears out form values

            } catch (error) {
                console.error('Database Connection Error:', error.message);
                // ERROR MODAL
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong while saving your message.',
                    icon: 'error',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#ffffff',
                    confirmButtonColor: 'rgba(255, 0, 0)'
                });
            }
        });
    } else {
        console.warn("Target Form element '#contactForm' could not be found on this page.");
    }

    // =========================================================
    // 2. EMAIL NEWSLETTER FORM LOGIC 
    // =========================================================
    // We use a delegator listener because footer.html loads asynchronously
    document.addEventListener('submit', async (e) => {
        // Check if the form being submitted is our email form
        if (e.target && e.target.id === 'emailForm') {
            e.preventDefault(); 

            // Safely grab the element now that we know the form exists and was submitted
            const emailInput = document.getElementById('e-mail');
            
            if (!emailInput) {
                console.error("Input element '#e-mail' not found in the DOM.");
                return;
            }

            const newsletterEmail = emailInput.value;

            try {
                // Post payload straight to your custom email data table
                const { data, error } = await supabaseClient
                    .from('email_submission')
                    .insert([
                        { email: newsletterEmail }
                    ]);

                if (error) throw error;

                // SUCCESS MODAL
                Swal.fire({
                    title: 'Success!',
                    text: 'Your E-mail has been sent successfully.',
                    icon: 'success',
                    background: 'rgba(0,0,0,0.8)',      
                    color: '#ffffff',            
                    confirmButtonColor: 'rgba(255, 0, 0)' 
                });
                
                e.target.reset(); // Safely clears out form values

            } catch (error) {
                console.error('Database Connection Error:', error.message);
                // ERROR MODAL
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong while sending your E-mail.',
                    icon: 'error',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#ffffff',
                    confirmButtonColor: 'rgba(255, 0, 0)'
                });
            }
        }
    });

});