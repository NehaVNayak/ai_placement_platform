from app.config.database import questions_collection

def seed_questions():

    questions = [

        # 1
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the time complexity of accessing an element in an array?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(1)",
        "explanation": "Array elements are accessed using index directly."
        },

        # 2
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which data structure is used for BFS traversal?",
        "options": ["Stack", "Queue", "Tree", "Graph"],
        "correct_answer": "Queue",
        "explanation": "BFS uses queue for level order traversal."
        },

        # 3
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the time complexity of binary search?",
        "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        "correct_answer": "O(log n)",
        "explanation": "Binary search halves the search space."
        },

        # 4
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which data structure uses LIFO?",
        "options": ["Queue", "Stack", "Array", "Linked List"],
        "correct_answer": "Stack",
        "explanation": "Stack follows Last In First Out."
        },

        # 5
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the worst-case time complexity of quicksort?",
        "options": ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"],
        "correct_answer": "O(n^2)",
        "explanation": "Occurs when pivot is poorly chosen."
        },

        # 6
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which traversal is used to get sorted output from BST?",
        "options": ["Preorder", "Inorder", "Postorder", "Level order"],
        "correct_answer": "Inorder",
        "explanation": "Inorder traversal gives sorted order."
        },

        # 7
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the time complexity of inserting at beginning of linked list?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(1)",
        "explanation": "Only pointer change required."
        },

        # 8
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which data structure is used in recursion?",
        "options": ["Queue", "Stack", "Tree", "Graph"],
        "correct_answer": "Stack",
        "explanation": "Function calls use call stack."
        },

        # 9
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which algorithm is used to find shortest path?",
        "options": ["DFS", "BFS", "Dijkstra", "Prim"],
        "correct_answer": "Dijkstra",
        "explanation": "Dijkstra finds shortest path in weighted graph."
        },

        # 10
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the space complexity of merge sort?",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        "correct_answer": "O(n)",
        "explanation": "Extra space is required."
        },

        # 11
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which structure is used for DFS?",
        "options": ["Queue", "Stack", "Heap", "Array"],
        "correct_answer": "Stack",
        "explanation": "DFS uses stack (explicit or recursion)."
        },

        # 12
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the best case of quicksort?",
        "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        "correct_answer": "O(n log n)",
        "explanation": "Balanced partition leads to optimal case."
        },

        # 13
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which structure is used for priority queue?",
        "options": ["Array", "Heap", "Stack", "Queue"],
        "correct_answer": "Heap",
        "explanation": "Heap efficiently supports priority queue."
        },

        # 14
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the height of a balanced binary tree?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(log n)",
        "explanation": "Balanced tree has logarithmic height."
        },

        # 15
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which algorithm detects cycle in graph?",
        "options": ["DFS", "BFS", "Kruskal", "Prim"],
        "correct_answer": "DFS",
        "explanation": "DFS helps detect cycles."
        },

        # 16
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of insertion sort worst case?",
        "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        "correct_answer": "O(n^2)",
        "explanation": "Worst case when array is reversed."
        },

        # 17
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which traversal is root-left-right?",
        "options": ["Inorder", "Preorder", "Postorder", "Level order"],
        "correct_answer": "Preorder",
        "explanation": "Preorder is root-left-right."
        },

        # 18
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in backtracking?",
        "options": ["Queue", "Stack", "Heap", "Graph"],
        "correct_answer": "Stack",
        "explanation": "Backtracking uses recursion stack."
        },

        # 19
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which algorithm is used for MST?",
        "options": ["Dijkstra", "Prim", "DFS", "BFS"],
        "correct_answer": "Prim",
        "explanation": "Prim constructs minimum spanning tree."
        },

        # 20
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of deleting from array end?",
        "options": ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        "correct_answer": "O(1)",
        "explanation": "Last element removal is constant time."
        },

        # 21
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which data structure is used to implement recursion?",
        "options": ["Queue", "Stack", "Heap", "Graph"],
        "correct_answer": "Stack",
        "explanation": "Recursion uses call stack internally."
        },

        # 22
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the best case time complexity of linear search?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(1)",
        "explanation": "Element found at first position."
        },

        # 23
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which sorting algorithm is stable?",
        "options": ["Quick sort", "Heap sort", "Merge sort", "Selection sort"],
        "correct_answer": "Merge sort",
        "explanation": "Merge sort maintains order of equal elements."
        },

        # 24
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which data structure is best for checking balanced parentheses?",
        "options": ["Queue", "Stack", "Tree", "Graph"],
        "correct_answer": "Stack",
        "explanation": "Stack tracks opening and closing brackets."
        },

        # 25
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which traversal is left-root-right?",
        "options": ["Preorder", "Inorder", "Postorder", "Level order"],
        "correct_answer": "Inorder",
        "explanation": "Inorder is left-root-right."
        },

        # 26
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the time complexity of heap insertion?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(log n)",
        "explanation": "Heap insertion requires heapify."
        },

        # 27
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in level order traversal?",
        "options": ["Stack", "Queue", "Heap", "Graph"],
        "correct_answer": "Queue",
        "explanation": "Queue is used in BFS traversal."
        },

        # 28
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is the worst case of binary search?",
        "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        "correct_answer": "O(log n)",
        "explanation": "Binary search always halves."
        },

        # 29
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in undo operations?",
        "options": ["Queue", "Stack", "Heap", "Tree"],
        "correct_answer": "Stack",
        "explanation": "Undo uses stack to track history."
        },

        # 30
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of searching in BST (average)?",
        "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        "correct_answer": "O(log n)",
        "explanation": "Balanced BST has log height."
        },

        # 31
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used for scheduling tasks?",
        "options": ["Stack", "Queue", "Heap", "Graph"],
        "correct_answer": "Queue",
        "explanation": "Queue is used for scheduling."
        },

        # 32
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of selection sort?",
        "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        "correct_answer": "O(n^2)",
        "explanation": "Selection sort always takes n^2."
        },

        # 33
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS uses FIFO?",
        "options": ["Stack", "Queue", "Heap", "Tree"],
        "correct_answer": "Queue",
        "explanation": "Queue follows FIFO."
        },

        # 34
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which algorithm is divide and conquer?",
        "options": ["Merge sort", "Bubble sort", "Insertion sort", "Selection sort"],
        "correct_answer": "Merge sort",
        "explanation": "Merge sort uses divide and conquer."
        },

        # 35
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of accessing linked list element?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "correct_answer": "O(n)",
        "explanation": "Traversal required."
        },

        # 36
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in BFS?",
        "options": ["Stack", "Queue", "Heap", "Array"],
        "correct_answer": "Queue",
        "explanation": "BFS uses queue."
        },

        # 37
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which sorting is in-place?",
        "options": ["Merge sort", "Quick sort", "Both", "None"],
        "correct_answer": "Quick sort",
        "explanation": "Quick sort uses constant space."
        },

        # 38
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in DFS?",
        "options": ["Queue", "Stack", "Heap", "Tree"],
        "correct_answer": "Stack",
        "explanation": "DFS uses stack."
        },

        # 39
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in expression evaluation?",
        "options": ["Queue", "Stack", "Tree", "Graph"],
        "correct_answer": "Stack",
        "explanation": "Stack is used for evaluation."
        },

        # 40
        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used for shortest path unweighted?",
        "options": ["DFS", "BFS", "Dijkstra", "Prim"],
        "correct_answer": "BFS",
        "explanation": "BFS finds shortest path in unweighted graph."
        },

        # 41–50 (shortened but same format)

        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "What is time complexity of dequeue operation?",
        "options": ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        "correct_answer": "O(1)",
        "explanation": "Deque supports constant operations."
        },

        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used in heap sort?",
        "options": ["Stack", "Queue", "Heap", "Tree"],
        "correct_answer": "Heap",
        "explanation": "Heap sort uses binary heap."
        },

        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS supports fast insertion and deletion?",
        "options": ["Array", "Linked List", "Stack", "Queue"],
        "correct_answer": "Linked List",
        "explanation": "No shifting required."
        },

        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which DS is used for recursion elimination?",
        "options": ["Stack", "Queue", "Heap", "Tree"],
        "correct_answer": "Stack",
        "explanation": "Stack replaces recursion."
        },

        {
        "subject": "DSA",
        "difficulty": "easy",
        "question_text": "Which traversal is postorder?",
        "options": ["Root-left-right", "Left-right-root", "Left-root-right", "None"],
        "correct_answer": "Left-right-root",
        "explanation": "Postorder traversal."
        }

    ]

    result = questions_collection.insert_many(questions)
    print(f"✅ Inserted {len(result.inserted_ids)} questions.")
    print("✅ Questions inserted successfully")