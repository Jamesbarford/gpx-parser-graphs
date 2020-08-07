export class Activity {
    public constructor(
        public readonly user_id: string,
        public readonly activity_date: string,
        public readonly activity_type: string,
        public readonly activity_name: string
    ) {}
}
