module SafeSpace::SafeSpaceComplaints {

    use std::string;
    use std::vector;
    use aptos_framework::event;

    /// Struct to represent a Complaint
    struct Complaint has key, store {
        description: string::String,  // The complaint text
        timestamp: u64,               // Time when the complaint was submitted
        sender: address               // User submitting the complaint
    }

    /// Event for complaint submission
    struct ComplaintEvent has drop {
        sender: address,
        complaint: string::String,
        timestamp: u64
    }

    /// Resource to store complaints
    struct ComplaintStore has key {
        events: event::Event<ComplaintEvent>
    }

    /// Initializes the complaint system
    public entry fun initialize_complaint_system(account: &signer) {
        let event_handle = event::new<ComplaintEvent>(account);
        move_to(account, ComplaintStore { events: event_handle });
    }

    /// Function to submit a complaint
    public entry fun submit_complaint(account: &signer, complaint_text: string::String) {
        let complaint_event = borrow_global_mut<ComplaintStore>(signer::address_of(account));
        
        let timestamp = move_std::time::now_seconds();
        let sender = signer::address_of(account);

        event::emit(&mut complaint_event.events, ComplaintEvent {
            sender,
            complaint: complaint_text,
            timestamp
        });
    }
}
