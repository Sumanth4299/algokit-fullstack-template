from algopy import ARC4Contract, UInt64, gtxn, itxn, Global, Account, arc4, String

class AiMarketplace(ARC4Contract):
    def __init__(self) -> None:
        self.task_count = UInt64(0)
        # In a production app, we would use Box Storage to map task IDs to details
        # For the hackathon, we will track the state of the latest task
        self.latest_result_hash = String("") 

    @arc4.abimethod
    def post_task(self, payment: gtxn.PaymentTransaction) -> None:
        """User locks 1 ALGO and increments the task counter."""
        assert payment.receiver == Global.current_application_address
        assert payment.amount >= 1_000_000 
        self.task_count += 1

    @arc4.abimethod
    def claim_reward(self, agent: Account, result_hash: String) -> None:
        """
        Agent submits the IPFS link to their work.
        The contract stores the hash and releases the 1 ALGO reward.
        """
        self.latest_result_hash = result_hash
        
        itxn.Payment(
            receiver=agent,
            amount=1_000_000,
            fee=0 
        ).submit()

    @arc4.abimethod
    def get_latest_result(self) -> String:
        """Allows the frontend to fetch the last completed AI output."""
        return self.latest_result_hash